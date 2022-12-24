// import MapContainer from '@src/hooks/useKakaoMap';
import useKakaoMap from '@src/components/common/Map/useKakaoMap';
import { Routes, Route } from 'react-router-dom';

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
    <>
      <div className="absolute">
        <div className="absolute">
          <Map />
        </div>
        <div className="relative z-10 flex flex-col">
          <button onClick={handleClickButton}> 마커 추가하기 </button>
          <button onClick={handleClickButton2}>id 1인 마커 제거하기</button>
          <button onClick={handleClickButton3}>서울시로 위치 이동하기</button>
        </div>
      </div>
      {/* {useKakaoMap()} */}
      {/*  */}
    </>
  );
};

export default App;
