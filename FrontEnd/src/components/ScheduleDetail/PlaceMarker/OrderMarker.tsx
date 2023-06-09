import { TCurrentplace, Tplace } from '@src/recoil/place/atom';
import React, { useEffect } from 'react';

interface OrderMarkerProps {
  data: Tplace;
  map: any;
  mapLoad?: boolean;
}
const OrderMarker = ({ data, map, mapLoad }: OrderMarkerProps) => {
  useEffect(() => {
    if (mapLoad) {
      const marker = new window.kakao.maps.CustomOverlay({
        position: new window.kakao.maps.LatLng(data.la, data.lo),
        content: content(+data.order),
      });

      marker.setMap(map);

      return () => {
        marker.setMap(null);
      };
    }
  }, [mapLoad]);

  return <div></div>;
};

export default OrderMarker;

//오버레이 content
const content = (i: number) => `
<div class="marker-box bg-primary3 rounded-full flex justify-center items-center w-25 h-25 text-white text-body1Bold">
    <span>${i}</span>
</div>`;
