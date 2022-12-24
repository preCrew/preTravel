// import MapContainer from '@src/hooks/useKakaoMap';
import useKakaoMap from '@src/hooks/useKakaoMap';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  const { Map, setNowLocation } = useKakaoMap();
  // const Map = useKakaoMap();
  // console.log(process.env.KAKAOMAP_API_KEY);
  return (
    <>
      <div className="absolute">
        <div className="absolute">
          <Map />
        </div>
        <div className="relative z-10">
          <button onClick={() => setNowLocation(33.452613, 126.570888)}>
            sflksdjfsldkfsj
          </button>
        </div>
      </div>
      {/* {useKakaoMap()} */}
      {/*  */}
    </>
  );
};

export default App;
