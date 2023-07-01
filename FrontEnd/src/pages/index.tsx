import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Suspense, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@src/recoil/user/atom';

import MyPlace from './MyPlaceInSchedule';
import LoginPage from './LoginPage';
import OauthPage from './OauthPage';
import MainPage from './MainPage';
import PlacePlan from './PlacePlan';
import MapInfoPage from './MapInfoPage';
import SchedulePlan from './SchedulePlan';
import SearchPage from './SearchPage';
import MyScheduleEdit from './SchedulePlan/edit';
import Mypage from './Mypage';
import ReviewPage from './ReviewPage';
import MySchedule from './AAA';

const App = () => {
  // TODO: 아래는 테스트 용으로 유저 id를 1로 지정함.
  // 테스트가 끝나면 아래 코드는 지워야함.
  const setUserState = useSetRecoilState(userAtom);
  useEffect(() => {
    console.log('start');
    setUserState(prev => ({ ...prev, id: '1' }));
  }, []);

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
          path="/mypage"
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
    </div>
  );
};

export default App;
