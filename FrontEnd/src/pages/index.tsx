import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MySchedule from './mySchedule';
import LoginPage from './LoginPage';
import OauthPage from './OauthPage';

const App = () => {
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
          content="width=device-width, initial-scale=1.0"
          viewport-fit="cover"
        />
      </Helmet>
      <Routes>
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
      </Routes>
    </div>
  );
};

export default App;
