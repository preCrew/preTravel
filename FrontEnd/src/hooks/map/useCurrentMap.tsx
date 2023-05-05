import { useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';

import { mapAtom } from '@src/recoil/map/atom';
import useKakaoMap from '@src/components/common/Map/useKakaoMap';

const useCurrentMap = () => {
  const { setNowLocation } = useKakaoMap();
  const [loading, setLoading] = useState(false);
  const [currentMapState, setCurrentMapState] = useRecoilState(mapAtom);
  const getCurrentLocation = (map: any) => {
    if (!('geolocation' in navigator)) {
      return console.log('위치정보가 없습니다.');
    }
    const onSucces = (position: any) => {
      //console.log(position.coords);
      const content = `<div class='absolute h-20 w-20 before:relative before:ml-[-100%] before:mt-[-100%] before:box-border before:block before:h-[300%] before:w-[300%] before:animate-pulse-ring before:rounded-[45px] before:content-[""] after:shadow-[0_0_8px_rgba(0,0,0,.3)] after:absolute after:left-0 after:top-0 after:block after:h-full after:w-full after:animate-pulse-dot after:rounded-[15px] after:bg-primary1 after:content-[""] before:bg-primary1'></div>`;
      //현재위치 마커 표시
      const markerPosition = new window.kakao.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude,
      );
      const marker = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: content,
      });

      console.log(map);
      marker.setMap(map);
      //현재 위시 이동
      setNowLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setLoading(true);
    };

    const onError = (err: any) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    navigator.geolocation.getCurrentPosition(onSucces, onError);
  };
  return { getCurrentLocation };
};

export default useCurrentMap;
