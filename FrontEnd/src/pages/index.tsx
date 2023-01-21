import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useKakaoMap from '@src/components/common/Map/useKakaoMap';
import MyScheduleCard from '@src/components/myScedule/MyScheduleCard';
import MySchedule from './mySchedule';

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
    <div className="safe-top safe-left safe-right safe-bottom">
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
          path="/test"
          element={
            <>
              <MyScheduleCard
                endDate=""
                index={2}
                region="경주"
                startDate="2022.10.31"
                title="경주 여행 나들이 경주 여행 나들이 경주 여행 나들이"
                imagePaths={[
                  'https://avatars.githubusercontent.com/u/7580112?v=4',
                ]}
                onClick={() => {
                  console.log('click1');
                }}
                deleteMode
              />
              <MyScheduleCard
                endDate="2022.10.31"
                index={1}
                region="경주"
                startDate="2022.10.31"
                title="경주 여행 나들이 "
                onClick={() => {
                  console.log('click2');
                }}
              />
            </>
          }
        />
        <Route
          path="/mySchedule/:id"
          element={<MySchedule />}
        />
        <Route
          path="/map"
          element={
            <>
              <div className="absolute">
                <div className="absolute">
                  <Map />
                </div>
                <div className="relative z-10 flex flex-col">
                  <button onClick={handleClickButton}> 마커 추가하기 </button>
                  <button onClick={handleClickButton2}>
                    id 1인 마커 제거하기
                  </button>
                  <button onClick={handleClickButton3}>
                    서울시로 위치 이동하기
                  </button>
                </div>
              </div>
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
