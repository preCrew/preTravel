import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getData = () =>
  new Promise(async resolve => {
    const data = await axios.get(`${process.env.SERVEL_URL}/posts`);
    resolve(data.data);
  });
const useGetRegionQuery = () =>
  useQuery(['getRegion'], {
    queryFn: getData,
  });

export default useGetRegionQuery;
