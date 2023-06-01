import {
  Coordinates,
  INITIAL_CENTER,
  INITIAL_ZOOM,
} from '@src/hooks/map/useMap';
import useScript from '@src/hooks/map/useScript';
import { useEffect, useRef } from 'react';

const url = '//dapi.kakao.com/v2/maps/sdk.js';
const libraries = ['services', 'clusterer', 'drawing'];
const apikey = process.env.KAKAOMAP_API_KEY;
export const src = `${url}?appkey=${apikey}&libraries=${libraries}&autoload=false`;

interface MapProps {
  onLoad?: (map: any) => void;
  initialCetner?: Coordinates;
  initialZoom?: number;
}

const Map = ({
  onLoad,
  initialCetner = INITIAL_CENTER,
  initialZoom = INITIAL_ZOOM,
}: MapProps) => {
  const mapRef = useRef<any>(null);
  const [success, error] = useScript(src);

  useEffect(() => {
    console.log(success);
    if (!success) return;
    window.kakao.maps.load(() => {
      let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      let options = {
        center: new window.kakao.maps.LatLng(
          37.46193840530018,
          127.14742795123425,
        ), //지도의 중심좌표.
        level: 11, //지도의 레벨(확대, 축소 정도)
      };
      const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      mapRef.current = map;

      if (onLoad) {
        onLoad(map);
      }
    });
  }, [success, error]);

  useEffect(() => {
    return () => {
      mapRef.current.destroy();
    };
  }, []);

  return (
    <>
      <div
        id="map"
        style={{ width: '100vw', height: '100vh' }}
      />
      ;
    </>
  );
};

export default Map;
