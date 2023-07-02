import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';

import MyPlace from '../pages/MyPlaceInSchedule';
import LoginPage from '../pages/LoginPage';
import OauthPage from '../pages/OauthPage';
import MainPage from '../pages/MainPage';
import PlacePlan from '../pages/PlacePlan';
import MapInfoPage from '../pages/MapInfoPage';
import SchedulePlan from '../pages/SchedulePlan';
import SearchPage from '../pages/SearchPage';
import MyScheduleEdit from '../pages/SchedulePlan/ScheduleEdit';
import Mypage from '../pages/Mypage';
import ReviewPage from '../pages/ReviewPage';
import MySchedule from '../pages/MySchedule';

const DefaultRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<MainPage />}
      />
      <Route
        path="/mypage/*"
        element={<Mypage />}
      />
      <Route
        path="/mySchedule"
        element={<MySchedule />}
      />
      <Route
        path="/mySchedule/:id"
        element={
          <Suspense fallback={'내 장소 로딩중....'}>
            <MyPlace />
          </Suspense>
        }
      />
      <Route
        path="/placePlan"
        element={<PlacePlan />}
      />
      <Route
        path="/schedulePlan"
        element={<SchedulePlan />}
      />
      <Route
        path="/schedulePlan/edit"
        element={<MyScheduleEdit />}
      />
      <Route
        path="/search/*"
        element={<SearchPage />}
      />
      <Route
        path="/map/info"
        element={
          <Suspense>
            <MapInfoPage />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={<LoginPage />}
      />
      <Route
        path="/oauth/:where"
        element={<OauthPage />}
      />
      <Route
        path="/review/*"
        element={<ReviewPage />}
      />
      <Route
        path="/*"
        element={<div>잘못된접근</div>}
      />
    </Routes>
  );
};

export default DefaultRoutes;
