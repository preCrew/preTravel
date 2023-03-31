import { Suspense, useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import useKakaoMap from '@src/components/common/Map/useKakaoMap';
import { categoryAtom } from '@src/recoil/marker/category/atom';
import SearchPage from '../SearchPage';
import MainPage from '../MainPage';
import KaKaoMap from './KaKaMap';

const Map = () => {
  // const { Map, currentLocation } = useKakaoMap();
  // const categoryState = useRecoilValue(categoryAtom);

  // const map = useMemo(() => <Map />, []);

  useEffect(() => {
    // currentLocation();
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="main"
          element={
            <Suspense fallback={<div>로딩즁</div>}>
              <MainPage />
            </Suspense>
          }
        />
        <Route
          path="search"
          element={<SearchPage />}
        />
      </Routes>
      <Suspense fallback={<div>loadinnggggggggggggggg</div>}>
        <KaKaoMap />
      </Suspense>
    </>
  );
};

export default Map;
