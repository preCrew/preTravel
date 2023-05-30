import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Response } from './responseInterfaces';

const deleteReview = async (idx: string) => {
  try {
    const response = await axios.delete<Response<any>>(
      `${process.env.REAL_SERVER_URL}/review?idx=${idx.toString()}`,
    );
    if (response.data.code === 200) {
      return response.data.data;
    }
    throw new Error(response.data.msg);
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
};
const useDeleteReview = (idx: string) => {
  return useMutation(['deleteReview'], {
    mutationFn: () => deleteReview(idx),
  });
};

export default useDeleteReview;
