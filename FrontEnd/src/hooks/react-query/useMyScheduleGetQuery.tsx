import { MyScheduleCardI } from '@src/components/myScedule/MyScheduleCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getData = () =>
  new Promise<MyScheduleCardI[]>(resolve => {
    setTimeout(async () => {
      const data = await axios.get('http://localhost:3001/posts');
      resolve(data.data);
    }, 200);
  });
const useMyScheduleGetQuery = () =>
  useQuery(['mySchedule'], {
    queryFn: getData,
  });

export default useMyScheduleGetQuery;
