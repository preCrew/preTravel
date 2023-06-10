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

  return {
    initializeMap,
    mapLoad,
  };
};

export default useMap;
