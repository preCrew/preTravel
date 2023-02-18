import { Data } from '@src/components/common/DataList';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface PlaceData {
  address: string;
  roadAddress: string;
  name: string;
  x: string;
  y: string;
}
interface RegionResponseData {
  code: number;
  msg: string;
  data: {
    reuslt: PlaceData[];
    page: {
      total: number;
      size: string;
      page: string;
    };
  };
}
const getData = (place: string) =>
  new Promise<Data<PlaceData>[]>(async resolve => {
    try {
      const res = await axios.get<RegionResponseData>(
        `${process.env.REAL_SERVER_URL}/map/place?keyword=${place}`,
      );
      console.log(res);
      const data = res.data.data.reuslt
        .filter(r => r.roadAddress)
        .map(r => ({
          idx: r.x + r.y,
          showData: r.name,
          data: r,
        }));
      resolve(data);
    } catch (e) {
      console.log(e);
    }
  });
const usePlaceGetQuery = (place: string) =>
  useQuery(['place'], { queryFn: () => getData(place), enabled: false });

export default usePlaceGetQuery;
