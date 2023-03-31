import { Suspense, useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import useKakaoMap from '@src/components/common/Map/useKakaoMap';
import { categoryAtom } from '@src/recoil/marker/category/atom';

const KaKaoMap = () => {
  const { Map, currentLocation } = useKakaoMap();

  const map = useMemo(() => <Map />, []);

  useEffect(() => {
    currentLocation();
  }, []);

  return <>{map}</>;
};

export default KaKaoMap;
