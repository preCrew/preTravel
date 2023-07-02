import { Routes, Route } from 'react-router-dom';
import { Suspense, useEffect } from 'react';

import MypageLike from './MypageLike';
import MypageMain from './MypageMain';
import MypageReview from './MypageReview';
import MypageVisit from './MypageVisit';
import VisitedList from './MypageVisit/VisitedList';

const Mypage = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<MypageMain />}
        />
        <Route
          path="/like"
          element={
            <Suspense>
              <MypageLike />
            </Suspense>
          }
        />
        <Route
          path="/review"
          element={
            <Suspense>
              <MypageReview />
            </Suspense>
          }
        />
        <Route
          path="/visit"
          element={
            <Suspense>
              <MypageVisit />
            </Suspense>
          }
        />
        <Route
          path="/visit/list"
          element={
            <Suspense>
              <VisitedList />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};

export default Mypage;
