import React, { useCallback } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import Data from '@src/components/common/AsyncDataList/Data';
import TopBar from '@src/components/common/TobBar';
import useGetUserInfo from '@src/hooks/react-query/useGetUserInfo';

const MypageReview = () => {
  const navigate = useNavigate();
  const {
    data: { review: reviewData },
  } = useGetUserInfo('1');

  const onClickBackButton = () => {
    navigate(-1);
  };

  const onClickViewReview = useCallback((review: any) => {
    const searchParam = createSearchParams({
      name: review.name,
      latitude: review.latitude,
      longitude: review.longitude,
    });

    navigate({
      pathname: '/review',
      search: `?${searchParam}`,
    });
  }, []);

  return (
    <>
      <TopBar onClickBackButton={onClickBackButton}></TopBar>
      <div className="pt-16">
        {reviewData.map((review: any) => (
          <Data onClickData={() => onClickViewReview(review)}>
            {review.name}
          </Data>
        ))}
      </div>
    </>
  );
};

export default MypageReview;
