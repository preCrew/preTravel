import BottomSheet from '@src/components/BottomSheet';
import { markerAtom } from '@src/recoil/marker/atom';
import { modalAtom } from '@src/recoil/modal/atom';
import { userFavoriteAtom } from '@src/recoil/user/getLike/atom';
import { userReviewAtom } from '@src/recoil/user/review/atom';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const MarkerBottomSheet = () => {
  const [isOpenState, setIsOpenState] = useRecoilState(modalAtom);
  const markerState = useRecoilValue(markerAtom);
  const myFavoriteState = useRecoilValue(userFavoriteAtom);
  const myUserReviewState = useRecoilValue(userReviewAtom);

  useEffect(() => {
    setIsOpenState(false);
  }, []);

  return (
    <BottomSheet>
      {markerState ? (
        '1'
      ) : (
        <>
          {/* <h3>{myFavoriteState.name}</h3>
          <p>{myFavoriteState.address}</p> */}
        </>
      )}
    </BottomSheet>
  );
};

export default MarkerBottomSheet;
