import { scheduleAtom } from '@src/recoil/schedule/atom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

interface TsheduleAdd {
  memberIdx: string;
  name: string;
  city: string;
  startDate: string;
  endDate: string;
  file: string;
}

const add = async (data: TsheduleAdd) => {
  console.log(data);
  try {
    const response = await axios.post(
      `${process.env.REAL_SERVER_URL}/schedule`,
      data,
    );

    return response.data.data;
  } catch (err) {
    throw err;
  }
};

const useAddScheduleQuery = () => {
  const setSchedulState = useSetRecoilState(scheduleAtom);

  return useMutation((data: TsheduleAdd) => add(data), {
    onSuccess: data => {
      console.log(data);
      setSchedulState(state => ({
        ...state,
        data,
      }));
    },
    onMutate: () => {
      console.log('!');
    },
    onSettled: () => {
      console.log('111');
    },
    onError: () => {
      console.log('!!!@#@!#');
    },
  });
};
export default useAddScheduleQuery;
