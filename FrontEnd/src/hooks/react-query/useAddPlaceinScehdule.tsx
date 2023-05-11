import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const add = async (data: any) => {
  try {
    axios.post(`${process.env.REAL_SERVER_URL}/spot`, { data });
  } catch (err) {
    throw err;
  }
};

const useAddPlaceinScehduleQuery = () =>
  useMutation(['addMyScheduleDetail'], {
    mutationFn: (data: any) => add(data),
    onSuccess: () => {
      console.log('!');
    },
    onMutate: () => {
      console.log('!');
    },
    onSettled: data => {
      console.log('111', data);
    },
    onError: () => {
      console.log('!!!@#@!#');
    },
  });

export default useAddPlaceinScehduleQuery;
