import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

import MySchedule from './mySchedule';
import MySchedule2 from './mySchedule2';
import LoginPage from './LoginPage';
import OauthPage from './OauthPage';
import MapPage from './MapPage';
import Main from './Main';
import SearchPage from './SearchPage';
import ReviewPage from './ReviewPage';
import tw from 'twin.macro';

const App = () => {
  useEffect(() => {
    console.log('다시시작');
    // TODO:
    //  - 새로고침 될때 혹은 주소창에 직접 url을 입력할 때
    //    쿠키에 저장된 리프레시 토큰을 서버가 확인후 액세스 토큰을 설정해줘야함
    //  - useSilentRefresh 훅을 생성해서 요청하면 될듯.
  });
  return (
    <div className="flex h-full w-full justify-center safe-top safe-left safe-right safe-bottom">
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
      <div css={tw`w-full h-full xsm:w-380`}>
        <Routes>
          <Route
            path="/"
            element={<Main />}
          />
          <Route
            path="/mySchedule"
            element={<MySchedule2 />}
          />
          <Route
            path="/mySchedule/:id"
            element={<MySchedule />}
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
            path="/map/*"
            element={<MapPage />}
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
    </div>
  );
};

export default App;
