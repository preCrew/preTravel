import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import usePlaceGetQuery, {
  PlaceData,
} from '@src/hooks/react-query/useGetPlaceQuery';
import useRegionGetQuery, {
  RegionData,
} from '@src/hooks/react-query/useGetRegionQuery';

import useLocationState from '@src/hooks/recoil/useLocationState';
import useToast from '@src/hooks/useToast';

import DataList from '../common/DataList';
import Data from '../common/DataList/Data';
import LoadingData from '../common/DataList/LoadingData';
import useInfinityScroll from '@src/hooks/useInfinityScroll';
import tw from 'twin.macro';

interface RegionPlaceListProps {
  inputVal: string;
  inputRef: React.RefObject<HTMLInputElement>;
  isCommit: boolean;
  setIsCommit: (isCommit: boolean) => void;
}

const RegionPlaceList = ({
  inputVal,
  inputRef,
  isCommit,
  setIsCommit,
}: RegionPlaceListProps) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
    locationState,
    locationState: { region },
    setLocationRegion,
    setSelectData,
  } = useLocationState();

  const { data: regionData, refetch: refetechRegionData } =
    useRegionGetQuery(inputVal);
  const {
    data: placeData,
    fetchNextPage: fetchNextPlaceData,
    isFetchingNextPage: isFetchingNextPlaceData,
    hasNextPage: hasNextPlaceData,
  } = usePlaceGetQuery(region, inputVal);

  const { InfiniteScrollPositionComponent } = useInfinityScroll(() => {
    if (!hasNextPlaceData) return;
    fetchNextPlaceData();
  });

  useEffect(() => {
    if (!isCommit) return;
    const getNextPlaceData = async () => {
      const placeArray = await fetchNextPlaceData();
      if (!placeArray?.data?.pages[0].boardPage.length) {
        showToast('searchPlaceData', '검색 결과가 없습니다. 다시 입력해주세요');
      }
    };
    const getRegionData = async () => {
      const regionArray = await refetechRegionData();
      if (!regionArray?.data?.length) {
        showToast('searchRegion', '검색 결과가 없습니다. 다시 입력해주세요');
      }
    };
    if (region) {
      getNextPlaceData();
    } else {
      getRegionData();
    }
    setIsCommit(false);
  }, [isCommit]);

  const handleClickItem = async (data: unknown) => {
    // 지역을 입력헀었다면
    if (region) {
      const placeData = (await data) as PlaceData;
      setSelectData(placeData);
      navigate(`/map/info?showButton=false`);
    } else {
      const regionData = (await data) as RegionData;
      setLocationRegion(regionData.body);
      // showToast(
      //   'region',
      //   `지역이 ${regionData.body} 입니다. 장소를 입력해주세요.`,
      // );
      // setMsg(`지역이 ${regionData.body} 입니다. 장소를 입력해주세요.`);
      // showToast();
      // 지역 입력 완료 후 일정짜기로 이동
      navigate('/schedulePlan');

      //inputRef.current?.focus();
    }
  };

  return (
    <>
      <DataList css={tw`no-scroll`}>
        {region
          ? /* 장소 리스트가 나옴*/
            placeData?.pages
              .flatMap(page => page?.boardPage)
              .map(v => (
                <Data
                  key={`${v?.name} + ${v?.roadAddress}`}
                  onClickData={() => handleClickItem(v)}
                >
                  {v?.body}
                </Data>
              ))
          : /* 지역 리스트가 나옴*/
            regionData?.map(
              v =>
                (
                  <Data
                    key={v.idx}
                    onClickData={() => handleClickItem(v)}
                  >
                    {v.body}
                  </Data>
                ) ?? [],
            )}
      </DataList>
      {/* {placeData?.pages && <InfiniteScrollPositionComponent />} */}
      <InfiniteScrollPositionComponent />
      {isFetchingNextPlaceData && <LoadingData />}
    </>
  );
};

export default RegionPlaceList;
