import React, { useCallback, useEffect } from 'react';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import useGetUserInfo from '@src/hooks/react-query/useGetUserInfo';
import { userAtom } from '@src/recoil/user/atom';
import Data from '@src/components/common/AsyncDataList/Data';
import TopBar from '@src/components/common/TobBar';

const MypageLike = () => {
  const navigate = useNavigate();
  const {
    data: { likeSpot },
  } = useGetUserInfo('1');

  const onClickLikeView = useCallback((spot: any) => {
    const searchParam = createSearchParams({
      name: spot.name,
      region: '',
      address: spot.address,
      latitude: spot.latitude,
      longitude: spot.longitude,
    });

    navigate({
      pathname: '/map/info',
      search: `?${searchParam}`,
    });
  }, []);

  const onClickBackButton = () => {
    navigate(-1);
  };

  return (
    <>
      <TopBar onClickBackButton={onClickBackButton}></TopBar>
      <div className="pt-16">
        {likeSpot.map((spot: any) => (
          <Data onClickData={() => onClickLikeView(spot)}>{spot.name}</Data>
        ))}
      </div>
    </>
  );
};

export default MypageLike;
