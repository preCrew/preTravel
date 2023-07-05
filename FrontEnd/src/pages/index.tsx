import { Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import DefaultRoutes from '../Routers/DefaultRoutes';
import AuthRoute from '@src/Routers/AuthRoute';

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
          content="width=device-width, initial-scale=1.0, user-scalable=no"
          viewport-fit="cover"
        />
      </Helmet>
      <Routes>
        <Route
          element={
            <AuthRoute>
              <DefaultRoutes />
            </AuthRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
