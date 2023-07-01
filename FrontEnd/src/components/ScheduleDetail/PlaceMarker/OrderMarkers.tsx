import React, { useEffect, useRef, useState } from 'react';

import { TCurrentplace, currentPlaceAtom } from '@src/recoil/place/atom';
import { useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import OrderMarker from './OrderMarker';

interface OrderMarkerProps {
  data: TCurrentplace;
  mapLoad: boolean;
}

const OrderMarkers = ({ data, mapLoad }: OrderMarkerProps) => {
  const queryClient = useQueryClient();
  const mapRef = useRef<any>(null);
  const [mapRender, setMaprender] = useState(false);

  useEffect(() => {
    if (mapLoad) {
      const mapData = queryClient.getQueryData(['/map']);
      mapRef.current = mapData;
      setMaprender(mapLoad);
      //console.log(mapLoad, mapRef.current, '맵로드');
    }
  }, [queryClient, mapLoad]);

  return (
    <>
      {mapRender &&
        data.list.map(place => (
          <OrderMarker
            key={place.order}
            map={mapRef.current}
            data={place}
            mapLoad={mapLoad}
          />
        ))}
    </>
  );
};

export default OrderMarkers;
