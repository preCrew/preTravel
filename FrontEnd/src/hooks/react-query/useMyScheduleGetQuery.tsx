import { MyScheduleCardI } from '@src/components/MyScedule/MyScheduleCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getData = () =>
  new Promise<MyScheduleCardI[]>(async resolve => {
    const data = await axios.get(`${process.env.SERVEL_URL}/posts`);
    resolve(data.data);
  });
const useMyScheduleGetQuery = () =>
  useQuery(['mySchedule'], {
    queryFn: getData,
  });

export default useMyScheduleGetQuery;
