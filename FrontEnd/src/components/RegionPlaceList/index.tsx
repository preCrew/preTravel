import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import usePlaceGetQuery, {
  PlaceData,
} from '@src/hooks/react-query/usePlaceGetQuery';
import useRegionGetQuery, {
  RegionData,
} from '@src/hooks/react-query/useRegionGetQuery';

import useLocationState from '@src/hooks/recoil/useLocationState';
import useToast from '@src/hooks/useToast';

import DataList from '../common/DataList';
import Data from '../common/DataList/Data';

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
  const { setMsg, showToast } = useToast();
  const {
    locationState: { region },
    setLocationRegion,
    setSelectData,
  } = useLocationState();

  const { data: regionData, refetch: refetechRegionData } =
    useRegionGetQuery(inputVal);
  const { data: placeData, fetchNextPage: fetchNextPlaceData } =
    usePlaceGetQuery(region, inputVal);

  useEffect(() => {
    if (!isCommit) return;

    if (region) {
      fetchNextPlaceData();
    } else {
      refetechRegionData();
    }
    setIsCommit(false);
  }, [isCommit]);

  const handleClickItem = (data: unknown) => {
    // 지역을 입력헀었다면
    if (region) {
      const placeData = data as PlaceData;
      setSelectData(placeData);
      navigate(`/map/info?showButton=false`);
    } else {
      const regionData = data as RegionData;
      setLocationRegion(regionData.body);

      setMsg(`지역이 ${regionData.body} 입니다. 장소를 입력해주세요.`);
      showToast();

      navigate(-1);

      inputRef.current?.focus();
    }
  };
  return (
    <DataList>
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
  );
};

export default RegionPlaceList;
