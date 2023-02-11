import getServerUri from '@src/utils/getServerUri';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const serverUri = getServerUri();
const getData = () =>
  new Promise(async resolve => {
    const data = await axios.get(`${serverUri}/posts`);
    resolve(data.data);
  });
const useGetRegionQuery = () =>
  useQuery(['getRegion'], {
    queryFn: getData,
  });

export default useGetRegionQuery;
