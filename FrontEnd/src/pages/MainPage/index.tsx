import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import tw from 'twin.macro';
import { useNavigate } from 'react-router-dom';

import Map from '@src/components/common/Map';
import TabSlide from '@src/components/common/TabSlide/TabSlide';
import useMap from '@src/hooks/map/useMap';
import Markers from '@src/components/common/Map/Markers';
import { selectedDayAtom } from '@src/recoil/date/atom';
import { mainTabCategory } from './data/mainTabCategory';
import { modalAtom } from '@src/recoil/modal/atom';
import MainModal from '@src/components/common/Main/MainModal';
import { clickMarkerAtom } from '@src/recoil/map/atom';
import SearchButton from '@src/components/common/Button/SearchButton';
import Column from '@src/components/common/FlexBox/Column';
import Nav from '@src/components/common/Layout/Nav';

const MainPage = () => {
  const navigate = useNavigate();
  const { initializeMap, mapLoad } = useMap();
  const [isOpenState, setOpenState] = useRecoilState(modalAtom);
  const [onClickMarkState, setOnClickMarkState] =
    useRecoilState(clickMarkerAtom);

  const [selectedDayState, setSelectedDayState] =
    useRecoilState(selectedDayAtom);

  useEffect(() => {
    if (onClickMarkState) setOpenState(true);
  }, [onClickMarkState]);

  const onLoadMap = (map: any) => {
    initializeMap(map);
  };

  const handleClickSearchButton = () => {
    navigate('/search/region');
  };

  return (
    <>
      <header css={tw`fixed z-20 w-full p-5 pt-2`}>
        <SearchButton
          bgColor="gray2"
          placeHolder="장소를 검색해주세요"
          onClickSearchButton={handleClickSearchButton}
          css={tw`z-[15] mb-3`}
        />
        <TabSlide
          data={mainTabCategory}
          category="카테고리별"
        />
      </header>
      <Map onLoad={onLoadMap} />
      {selectedDayState === 0 || selectedDayState === 1 ? (
        <Markers
          mapLoad={mapLoad}
          categoryNum={selectedDayState}
          iconNum={selectedDayState}
        />
      ) : null}
      {onClickMarkState && <MainModal data={onClickMarkState} />}

      <Nav />
    </>
  );
};
export default MainPage;
