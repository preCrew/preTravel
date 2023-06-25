import React, { useCallback } from 'react';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';

import Data from '@src/components/common/AsyncDataList/Data';
import TopBar from '@src/components/common/TobBar';
import VisitedListItem from '@src/components/Mypage/VisitedListItem';

const VisitedList = () => {
  const { state } = useLocation();
  const placeList: any = state;
  const navigate = useNavigate();

  const onClickBackButton = () => {
    navigate(-1);
  };

  return (
    <>
      <TopBar onClickBackButton={onClickBackButton}></TopBar>
      <div className="pt-16">
        {placeList.list.map((schedule: any) =>
          schedule.list.map((place: any) => (
            <Data>
              <VisitedListItem place={place} />
            </Data>
          )),
        )}
      </div>
    </>
  );
};

export default VisitedList;
