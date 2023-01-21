import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useKakaoMap from '@src/components/common/Map/useKakaoMap';
import MyScheduleCard from '@src/components/myScedule/MyScheduleCard';
import MySchedule from './mySchedule';
import MySchedule2 from './mySchedule2';

let test = 33.452613;
let id = 1;

const App = () => {
  const { Map, setNowLocation, addMarker, removeMarker } = useKakaoMap();
  const handleClickButton = () => {
    addMarker({ lat: test, lng: 126.570738 }, '근린공원', id);
    test -= 0.0005;
    id++;
  };
  const handleClickButton2 = () => {
    removeMarker(1);
  };
  const handleClickButton3 = () => {
    // 서울시 강남구의 위치로 이동
    setNowLocation({ lat: 37.566826, lng: 126.9786567 });
    // setNowLocation()
  };
  return (
    <div className="safe-top safe-left safe-right safe-bottom w-full h-full">
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
          path="/mySchedule"
          element={<MySchedule2 />}
        />
        <Route
          path="/mySchedule/:id"
          element={<MySchedule />}
        />
      </Routes>
    </div>
  );
};

export default App;
