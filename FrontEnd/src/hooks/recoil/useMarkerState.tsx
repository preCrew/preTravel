import { maekerOnMapAtom, markerAtom } from '@src/recoil/marker/atom';
import React from 'react';
import { useRecoilState } from 'recoil';

const useMarkerState = () => {
  const [markerState, setMarkerState] = useRecoilState(maekerOnMapAtom);

  const setGetLike = (status: boolean) => {
    setMarkerState(status);
  };

  return {
    markerState,
    setGetLike,
  };
};

export default useMarkerState;
