import React, { useEffect } from 'react';

interface MarkerProps {
  map?: any;
  la: string;
  lo: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const Marker = ({ map, icon, la, lo }: MarkerProps) => {
  useEffect(() => {
    if (map) {
      const imageSize = new window.kakao.maps.Size(30, 30);
      const markerImage = new window.kakao.maps.MarkerImage(icon, imageSize);
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(la, lo), // 마커를 표시할 위치
        //title: markerInfo.data[i].name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
        // clickable: true,
      });
      marker.setMap(map);

      return () => {
        marker.setMap(null);
      };
    }
  }, [map]);

  return <div></div>;
};

export default Marker;
