import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Suspense, useEffect } from 'react';

import MyPlace from './MyPlaceInSchedule';
import LoginPage from './LoginPage';
import OauthPage from './OauthPage';
import MapPage from './MainPage';
import MainPage from './MainPage';
import SearchPage from './SearchPage';
import PlacePlan from './PlacePlan';
import MapInfoPage from './MapInfoPage';
import MySchedule from './MyPlaceInSchedule';
import SchedulePlan from './SchedulePlan';

const App = () => {
  useEffect(() => {
    console.log('다시시작');
    // TODO:
    //  - 새로고침 될때 혹은 주소창에 직접 url을 입력할 때
    //    쿠키에 저장된 리프레시 토큰을 서버가 확인후 액세스 토큰을 설정해줘야함
    //  - useSilentRefresh 훅을 생성해서 요청하면 될듯.
  });
  return (
    <div className="h-full w-full safe-top safe-left safe-right safe-bottom">
      <Helmet>
        <title>여행</title>
        <meta charSet="UTF-8" />
        <meta
          http-equiv="X-UA-Compatible"
          content="IE=edge"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
          viewport-fit="cover"
        />
      </Helmet>
      <Routes>
        <Route
          path="/"
          element={<MainPage />}
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
          path="search"
          element={<SearchPage />}
        />
        <Route
          path="/map/info"
          element={<MapInfoPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/oauth/:where"
          element={<OauthPage />}
        />
        {/* <Route
          path="/map/main"
          element={
            <Suspense fallback={'로딩즁,,,'}>
              <MainPage />
            </Suspense>
          }
        /> */}
        {/* <Route
          path="/map/*"
          element={<MapPage />}
        /> */}
        <Route
          path="/*"
          element={<div>잘못된접근</div>}
        />
      </Routes>
    </div>
  );
};

export default App;
