import { Suspense, useEffect, useLayoutEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import SearchPage from '../SearchPage';
import MainPage from '../MainPage';
import KaKaoMap from './KaKaMap';
import useKakaoMap from '@src/components/common/Map/useKakaoMap';
import MapInfoPage from '../MapInfoPage';

const MapPage = () => {
  const { Map } = useKakaoMap();
  const map = useMemo(() => <Map />, [Map]);

  return (
    <>
      {/* {map} */}
      <Routes>
        {/* <Route
          path="main"
          element={
            <Suspense fallback={<div>메인화면 로딩중...</div>}>
              <MainPage />
            </Suspense>
          }
        /> */}
        <Route
          path="search"
          element={<SearchPage />}
        />
        {/* <Route
          path="mySchedule/:id"
          element={<MySchedule />}
        /> */}
      </Routes>
    </>
  );
};

export default MapPage;
