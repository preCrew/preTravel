import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import useLocationState from '../../hooks/recoil/useLocationState';
import useToastState from '@src/hooks/recoil/useToastState';

import TopBar from '@src/components/common/TobBar';
import SearchButton from '@src/components/common/Button/SearchButton';
import DataList, { Data } from '@src/components/common/DataList';

const dataName = 'name';
const SearchPage = () => {
  const navigate = useNavigate();
  const {
    locationState: { region },
  } = useLocationState();

  const { locationState, setLocationRegion, setLocationPlace } =
    useLocationState();

  const { setIsToastOpen, setMsg } = useToastState();

  const inputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<Data[]>([
    { id: '1', name: '인천광역시 서구 오류동' },
    { id: '2', name: '인천광역시 계양구 오류동' },
    { id: '3', name: '서울특별시 구로구 오류동' },
    { id: '4', name: '대전광역시 중구 오류동' },
  ]);
  const [data2, setData2] = useState<Data[]>([
    { id: '11', name: '경북 경주시 포석로 1078 1층' },
    { id: '22', name: '대구 중구 중앙대로 406-8 황남쫀드기' },
    { id: '33', name: '부산 해운대구 구남로 45' },
    { id: '44', name: '부산 기장군 기장읍 용궁길 62-7' },
  ]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleClickBackButton = () => {
    navigate(-1);
  };

  const handleSubmitButton = () => {
    inputRef.current?.blur();
  };

  const handleClickItem = (data: Data) => {
    // 지역을 입력헀었다면
    if (locationState.region) {
      // 장소를 입력후
      setLocationPlace(data[dataName]);
      navigate('/map/info');

      // TODO: /map/info 로 이동
    } else {
      setLocationRegion(data[dataName]);
      navigate(-1);
      setMsg(`지역이 ${data[dataName]} 입니다. 장소를 입력해주세요.`);
      setIsToastOpen(true);
    }
  };

  return (
    <>
      <div css={tw`w-full h-full absolute z-10 top-0 bg-white`}>
        <TopBar onClickBackButton={handleClickBackButton}>
          <SearchButton
            nowPage={locationState.nowPage}
            inputRef={inputRef}
            onKeydownInput={handleSubmitButton}
            onClickSearchIcon={handleSubmitButton}
          />
        </TopBar>
        <DataList
          data={region ? data2 : data}
          dataName={dataName}
          onClickData={handleClickItem}
        />
      </div>
    </>
  );
};

export default SearchPage;
