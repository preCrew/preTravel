// import { loadKakaoMapScript } from '@src/hooks/useKakaoMapScript';
import { useEffect, useRef, useState } from 'react';
import useScript from './useScript';

declare global {
  interface Window {
    kakao: any;
  }
}

const url = '//dapi.kakao.com/v2/maps/sdk.js';
const libraries = ['services', 'clusterer', 'drawing'];
const apikey = process.env.KAKAOMAP_API_KEY;
const src = `${url}?appkey=${apikey}&libraries=${libraries}&autoload=false`;

function useKakaoMap() {
  const [success, error] = useScript(src);
  const [markers, setMarkers] = useState<any[]>([]);
  const map = useRef<any>(null);

  const Map = () => {
    useEffect(() => {
      if (!success) return;
      window.kakao.maps.load(() => {
        let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        let options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
          level: 3, //지도의 레벨(확대, 축소 정도)
        };

        map.current = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      });
    }, [success, error]);

    return (
      <div
        id="map"
        style={{ width: '100vw', height: '100vh' }}
      />
    );
  };

  const setNowLocation = (Lat: number, Lng: number) => {
    if (!map.current) return;

    const moveLatLon = new window.kakao.maps.LatLng(Lat, Lng);
    map.current.setCenter(moveLatLon);
  };

  return { Map, setNowLocation };
}

export default useKakaoMap;
