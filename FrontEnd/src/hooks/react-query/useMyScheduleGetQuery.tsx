import { MyScheduleCardI } from '@src/components/myScedule/MyScheduleCard';
import getServerUri from '@src/utils/getServerUri';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const serverUri = getServerUri();
const getData = () =>
  new Promise<MyScheduleCardI[]>(async resolve => {
    const data = await axios.get(`${getServerUri}/posts`);
    resolve(data.data);
  });
const useMyScheduleGetQuery = () =>
  useQuery(['mySchedule'], {
    queryFn: getData,
  });

export default useMyScheduleGetQuery;
