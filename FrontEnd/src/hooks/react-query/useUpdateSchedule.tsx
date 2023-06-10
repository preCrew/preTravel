import { scheduleAtom } from '@src/recoil/schedule/atom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

interface TsheduleAdd {
  memberIdx: string;
  idx: string;
  name: string;
  city: string;
  startDate: string;
  endDate: string;
  file: string;
}

const update = async (data: TsheduleAdd) => {
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

const useUpdateScheduleQuery = () => {
  const setSchedulState = useSetRecoilState(scheduleAtom);

  return useMutation((data: TsheduleAdd) => update(data), {
    onSuccess: data => {
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
export default useUpdateScheduleQuery;
