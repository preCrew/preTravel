import { Suspense, useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import useKakaoMap from '@src/components/common/Map/useKakaoMap';
import { categoryAtom } from '@src/recoil/marker/category/atom';
import SearchPage from '../SearchPage';
import MainPage from '../MainPage';

const Map = () => {
  const { Map, mapAreaChange, currentLocation } = useKakaoMap();
  const categoryState = useRecoilValue(categoryAtom);

  const map = useMemo(() => <Map />, []);

  useEffect(() => {
    if (categoryState !== null) mapAreaChange(categoryState);
  }, [categoryState]);

  useEffect(() => {
    currentLocation();
  }, []);

  return (
    <Suspense fallback={<div>로딩즁..</div>}>
      {map}
      <Routes>
        <Route
          path="main"
          element={<MainPage />}
        />
        <Route
          path="search"
          element={<SearchPage />}
        />
      </Routes>
    </Suspense>
  );
};

export default Map;
