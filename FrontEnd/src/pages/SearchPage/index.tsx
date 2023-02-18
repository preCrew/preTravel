import { Suspense, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import useLocationState from '../../hooks/recoil/useLocationState';
import useOnChange from '@src/hooks/useOnChange';
import useRegionGetQuery, {
  RegionData,
} from '@src/hooks/react-query/useRegionGetQuery';
import usePlaceGetQuery, {
  PlaceData,
} from '@src/hooks/react-query/usePlaceGetQuery';

import TopBar from '@src/components/common/TobBar';
import SearchButton from '@src/components/common/Button/SearchButton';
import DataList from '@src/components/common/DataList';
import Data from '@src/components/common/DataList/Data';
import useInfinityScroll from '@src/hooks/useInfinityScroll';

interface SearchPageProps {
  setMsg: (msg: string) => void;
  showToast: () => void;
}
const SearchPage = ({ setMsg, showToast }: SearchPageProps) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const { value: inputVal, onChange: onChangeInput } = useOnChange();

  const {
    locationState: { region, nowPage },
    setLocationRegion,
    setLocationState,
    setSelectData,
  } = useLocationState();

  const { data: regionData, refetch: refetchRegion } =
    useRegionGetQuery(inputVal);

  const {
    data: PlaceData,
    fetchNextPage: fetchNextPagePlace,
    remove: removePlaceData,
  } = usePlaceGetQuery(`${region} ${inputVal}`);

  useInfinityScroll(() => {
    fetchNextPagePlace();
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleClickBackButton = () => {
    navigate(-1);

    if (region) {
      setLocationState('map');
      setLocationRegion('');
    }
  };

  const handleSubmit = () => {
    inputRef.current?.blur();
    if (region) {
      removePlaceData();
      fetchNextPagePlace();
    } else {
      refetchRegion();
    }
  };

  const handleClickItem = (data: unknown) => {
    // 지역을 입력헀었다면
    if (region) {
      const placeData = data as PlaceData;
      setSelectData(placeData);
      navigate(`/map/info?showButton=false`);
    } else {
      const regionData = data as RegionData;
      console.log(data);
      setLocationRegion(regionData.body);
      setMsg(`지역이 ${regionData.body} 입니다. 장소를 입력해주세요.`);
      showToast();
      navigate(-1);
      inputRef.current?.focus();
    }
  };

  return (
    <>
      <div css={tw`w-full h-full absolute z-10 top-0 bg-white`}>
        <TopBar onClickBackButton={handleClickBackButton}>
          <SearchButton
            nowPage={nowPage}
            inputRef={inputRef}
            onSubmit={handleSubmit}
            onChangeInput={onChangeInput}
            inputVal={inputVal}
          />
        </TopBar>
        <DataList>
          {region
            ? /* 장소 리스트가 나옴*/
              PlaceData?.pages
                .flatMap(page => page?.boardPage)
                .map(v => (
                  <Data
                    key={v?.idx}
                    onClickData={() => handleClickItem(v)}
                  >
                    {v?.body}
                  </Data>
                ))
            : /* 지역 리스트가 나옴*/
              regionData?.map(v => (
                <Data
                  key={v.idx}
                  onClickData={() => handleClickItem(v)}
                >
                  {v.body}
                </Data>
              ))}
        </DataList>
      </div>
    </>
  );
};

export default SearchPage;
