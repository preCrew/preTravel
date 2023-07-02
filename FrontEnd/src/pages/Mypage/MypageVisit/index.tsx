import React, { useCallback } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import useGetUserInfo from '@src/hooks/react-query/useGetUserInfo';
import VisitedList from '@src/components/Mypage/VisitedList';
import TopBar from '@src/components/common/TobBar';

const MypageVisit = () => {
  const navigate = useNavigate();
  const {
    data: { schedule: scheduleData },
  } = useGetUserInfo('12');

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

  const handleClickCard = (cardIdx: number, index: number) => {
    // if (!editMode) {
    //   navigate(`${cardIdx}`, { state: lists?.[index].city });
    // } else {
    //   navigate(`/schedulePlan/edit`, { state: lists?.[index] });
    //   setEditCard(lists?.[index]);
    // }
  };

  return (
    <>
      <TopBar onClickBackButton={onClickBackButton} />
      <ul className="mt-14 content-inner">
        {scheduleData.map((schedule: any, idx: number) => (
          <VisitedList
            key={idx}
            data={schedule}
          />
        ))}
      </ul>
    </>
  );
};

export default MypageVisit;
