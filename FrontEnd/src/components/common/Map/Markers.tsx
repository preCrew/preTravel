import { useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import IcoFavorite from '@src/assets/svgs/ico-favorite.svg?url';
import IcoReview from '@src/assets/svgs/ico-review.svg?url';

import useGetMapLike from '@src/hooks/react-query/useGetMapLike';
import Marker from './Marker';
import useGetMapReview from '@src/hooks/react-query/useGetMapReview';

interface MarkersPops {
  mapLoad: boolean;
  iconNum: number;
  categoryNum: number;
}

const Markers = ({ mapLoad, iconNum, categoryNum }: MarkersPops) => {
  const queryClient = useQueryClient();
  const mapRef = useRef<any>(null);
  const [markerData, setMarkerData] = useState<any>([]);

  const [mapInfo, setMapInfo] = useState({
    memberIdx: '1',
    smallLa: '12',
    largeLa: '12',
    smallLo: '12',
    largeLo: '12',
  });
  const { data: likeData, refetch: refetchLike } = useGetMapLike(mapInfo);
  const { data: reviewData, refetch: refetchReview } = useGetMapReview(mapInfo);

  const fetchMarker = (
    currentNum: number,
    fetchFunc: () => void,
    data: any[],
  ) => {
    if (categoryNum === currentNum) {
      const fetchLike = async () => {
        await fetchFunc();
        setMarkerData(data);
      };
      fetchLike();
    }
  };

  useEffect(() => {
    if (mapLoad) {
      const mapData = queryClient.getQueryData(['/map']);
      mapRef.current = mapData;

      const idelEvent = (mapData: any) => {
        // 지도 영역을 불러옵니다
        const bounds = mapData.getBounds();
        // 영역정보의 남서쪽 정보를 얻어옵니다
        const swLatlng = bounds.getSouthWest();
        // 영역정보의 북동쪽 정보를 얻어옵니다
        const neLatlng = bounds.getNorthEast();

        const data = {
          memberIdx: '1',
          smallLa: swLatlng.Ma,
          largeLa: neLatlng.Ma,
          smallLo: swLatlng.La,
          largeLo: neLatlng.La,
        };

        setMapInfo(data);
      };

      window.kakao.maps.event.addListener(mapData, 'idle', () =>
        idelEvent(mapData),
      );

      return () => {
        if (mapData)
          window.kakao.maps.event.removeListener(mapData, 'idle', () =>
            idelEvent(mapData),
          );
      };
    }
  }, [queryClient]);

  useEffect(() => {
    fetchMarker(0, refetchLike, likeData);
    fetchMarker(1, refetchReview, reviewData);
  }, [mapInfo]);

  return (
    <>
      {markerData &&
        markerData.map((marker: any) => (
          <Marker
            key={marker.idx}
            map={mapRef.current}
            la={marker.latitude}
            lo={marker.longitude}
            icon={iconGenerater(iconNum)}
          />
        ))}
      {}
    </>
  );
};

export default Markers;

const iconGenerater = (num: number) => {
  switch (num) {
    case 0:
      return IcoFavorite;
    case 1:
      return IcoReview;
    default:
      return null;
  }
};
