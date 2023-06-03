import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Response } from './responseInterfaces';
export interface RegionData {
  idx: string;
  body: string;
  latitude: string;
  longitude: string;
}
interface RegionResponseData {
  idx: string;
  si: string;
  gu: string;
  dong: string;
  latitude: string;
  longitude: string;
}

const getData = async (region: string) => {
  console.log('data from server');
  const res = await axios.get<Response<RegionResponseData[]>>(
    `${process.env.REAL_SERVER_URL}/map?keyword=${region}`,
  );
  const data = res.data.data.map(r => ({
    ...r,
    idx: r.idx,
    body: `${r.si} ${r.gu} ${r.dong}`,
  }));

  return {
    boardPage: data,
    currentPage: 1,
    isLast: false,
  };
};

const useRegionGetQuery = (region: string) => {
  return useInfiniteQuery(['region', region], () => getData(region), {
    enabled: false,
  });
};

export default useRegionGetQuery;
