import { Suspense, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import useLocationState from '../../hooks/recoil/useLocationState';
import useOnChange from '@src/hooks/useOnChange';
import useRegionGetQuery from '@src/hooks/react-query/useRegionGetQuery';
import usePlaceGetQuery, {
  PlaceData,
} from '@src/hooks/react-query/usePlaceGetQuery';

import TopBar from '@src/components/common/TobBar';
import SearchButton from '@src/components/common/Button/SearchButton';
import DataList, { Data } from '@src/components/common/DataList';

interface SearchPageProps {
  setMsg: (msg: string) => void;
  showToast: () => void;
}
const SearchPage = ({ setMsg, showToast }: SearchPageProps) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    locationState: { region, nowPage },
    setLocationRegion,
    setLocationState,
    setSelectData,
  } = useLocationState();

  const { value: inputVal, onChange: onChangeInput } = useOnChange();

  const { data: regionData, refetch: refetchRegion } =
    useRegionGetQuery(inputVal);

  const { data: placeData, refetch: refetchPlace } = usePlaceGetQuery(
    `${region} ${inputVal}`,
  );

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
      refetchPlace();
    } else {
      refetchRegion();
    }
  };

  const handleClickItem = (data: Data<unknown>) => {
    const placeData = data.data as PlaceData;
    // console.log('place: ', placeData);
    // console.log(nowPage);
    // 지역을 입력헀었다면
    if (region) {
      setSelectData(placeData);
      navigate(`/map/info?showButton=false`);
    } else {
      setLocationRegion(data.showData as string);
      setMsg(`지역이 ${data.showData} 입니다. 장소를 입력해주세요.`);
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
        <Suspense fallback={<div>loading...</div>}>
          <DataList
            data={region ? placeData ?? [] : regionData ?? []}
            onClickData={handleClickItem}
          />
        </Suspense>
      </div>
    </>
  );
};

export default SearchPage;
