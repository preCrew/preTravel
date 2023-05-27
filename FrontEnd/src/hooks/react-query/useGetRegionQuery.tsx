import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Response } from './responseInterfaces';
export interface RegionData {
  idx: number;
  body: string;
  latitude: string;
  longitude: string;
}
interface RegionResponseData {
  idx: number;
  si: string;
  gu: string;
  dong: string;
  latitude: string;
  longitude: string;
}

const getData = async (region: string) => {
  const res = await axios.get<Response<RegionResponseData[]>>(
    `${process.env.REAL_SERVER_URL}/map?keyword=${region}`,
  );
  const data = res.data.data.map(r => ({
    ...r,
    idx: r.idx,
    body: `${r.si} ${r.gu} ${r.dong}`,
  }));

  return data;
};

const useRegionGetQuery = (region: string) =>
  useQuery(['region', region], {
    queryFn: () => getData(region),
    enabled: false,
  });

export default useRegionGetQuery;