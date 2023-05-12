import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const add = async (data: any) => {
  console.log(JSON.stringify(data));
  try {
    await axios.post(`${process.env.REAL_SERVER_URL}/spot`, data, {
      headers: {
        'Content-Type': `application/json`,
      },
    });
  } catch (err) {
    throw err;
  }
};

const useAddPlaceinScehduleQuery = () =>
  useMutation((data: any) => add(data), {
    onSuccess: data => {
      console.log('성공', data);
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
