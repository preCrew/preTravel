import { Suspense, useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

// import useKakaoMap from '@src/components/common/Map/useKakaoMap';
import { categoryAtom } from '@src/recoil/marker/category/atom';
import useKakaoMap from '@src/components/common/Map/useKakaoMap';

const KaKaoMap = () => {
  const { Map } = useKakaoMap();

  const map = useMemo(() => <Map />, []);

  return (
    <>
      <Map />
    </>
  );
};

export default KaKaoMap;
