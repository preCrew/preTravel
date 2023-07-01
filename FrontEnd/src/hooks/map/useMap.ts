import { useCallback, useState } from 'react';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

type Lat = number;
type Lng = number;
export type Coordinates = [Lat, Lng];

export const INITIAL_CENTER: Coordinates = [37.5262411, 126.99289439];
export const INITIAL_ZOOM = 10;

const useMap = () => {
  const [mapLoad, setMapLoad] = useState(false);
  const queryClient = useQueryClient();

  const initializeMap = useCallback(
    (map: any) => {
      queryClient.setQueryData(['/map'], map);
      setMapLoad(true);
    },
    [queryClient],
  );

  const getCenterMap = useCallback(
    (loaction: string[]) => {
      const mapData: any = queryClient.getQueryData(['/map']);
      const moveLatLon = new window.kakao.maps.LatLng(...loaction);
      mapData.setCenter(moveLatLon);
    },
    [mapLoad],
  );

  const setLevelMap = useCallback(() => {
    const mapData: any = queryClient.getQueryData(['/map']);
    const level = mapData.getLevel();

    // 지도를 1레벨 내립니다 (지도가 확대됩니다)
    mapData.setLevel(level - 10);
  }, [mapLoad]);

  return {
    initializeMap,
    mapLoad,
    getCenterMap,
    setLevelMap,
  };
};

export default useMap;
