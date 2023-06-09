import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import tw from 'twin.macro';

import Map from '@src/components/common/Map';
import TabSlide from '@src/components/common/TabSlide/TabSlide';
import useMap from '@src/hooks/map/useMap';
import Markers from '@src/components/common/Map/Markers';
import { selectedDayAtom } from '@src/recoil/date/atom';
import { mainTabCategory } from './data/mainTabCategory';
import { modalAtom } from '@src/recoil/modal/atom';
import MainModal from '@src/components/common/Main/MainModal';
import { clickMarkerAtom } from '@src/recoil/map/atom';

const MainPage = () => {
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

  return (
    <>
      <header css={tw`fixed z-20 w-full left-5 top-5`}>
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
    </>
  );
};
export default MainPage;
