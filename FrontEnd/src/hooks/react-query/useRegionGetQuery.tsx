import { Data } from '@src/components/common/DataList';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
interface RegionData {
  idx: number;
  si: string;
  gu: string;
  dong: string;
  latitude: string;
  longitude: string;
}
// interface RegionResponseData {
//   code: number;
//   msg: string;
//   data: Data[];
// }

const getData = (region: string) =>
  new Promise<Data<RegionData>[]>(async resolve => {
    const res = await axios.get(
      `${process.env.REAL_SERVER_URL}/map?keyword=${region}`,
    );
    const data = res.data.data.map((r: RegionData) => ({
      idx: r.idx,
      showData: `${r.si} ${r.gu} ${r.dong}`,
      data: r,
    }));
    resolve(data);
  });
const useRegionGetQuery = (region: string) =>
  useQuery(['region'], {
    queryFn: () => getData(region),
    enabled: false,
  });

export default useRegionGetQuery;
