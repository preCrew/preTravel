import { userAtom } from '@src/recoil/user/atom';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { useRecoilValue } from 'recoil';

export interface MySchedule {
  createDate: string;
  endDate: string;
  idx: number;
  memberIdx: string;
  modifyDate?: string;
  name: string;
  startDate: string;
  city: string;
  file: any[];
}

const getData = async (memberIdx: string) => {
  try {
    const response = await axios.get<AxiosResponse<MySchedule[]>>(
      `${process.env.REAL_SERVER_URL}/schedule?memberIdx=${memberIdx}`,
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
const useMyScheduleGetQuery = () => {
  const userState = useRecoilValue(userAtom);
  return useQuery(['mySchedule'], () => getData(userState.id), {
    //staleTime:
  });
};

export default useMyScheduleGetQuery;
