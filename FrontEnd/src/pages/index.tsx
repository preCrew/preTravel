import { Routes, Route } from 'react-router-dom';
import MySchedule from './mySchedule';
import { Helmet } from 'react-helmet-async';

const App = () => {
  return (
    <div className='safe-top safe-left safe-right safe-bottom'>
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
        {/* <Route
          path="/view/:id"
          element={}
        />
        <Route
          path="/login"
          element={}
        /> */}
        <Route
          path="/mySchedule/:id"
          element={<MySchedule/>}
        />
        {/* <Route
          path="admincollectmusic"
          element={<CollectMusicPage />}
        /> */}
      </Routes>
    </div>
  );
};

export default App;
