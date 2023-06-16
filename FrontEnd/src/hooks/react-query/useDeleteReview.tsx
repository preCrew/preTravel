import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { Response } from './responseInterfaces';

const deleteReview = async (
  storeName: string,
  idx: string,
  queryClient: QueryClient,
) => {
  try {
    const response = await axios.delete<Response<any>>(
      `${process.env.REAL_SERVER_URL}/review?idx=${idx.toString()}`,
    );
    if (response.data.code === 200) {
      queryClient.invalidateQueries(['useGetReviewByName', storeName]);
      return response.data.data;
    }
    throw new Error(response.data.msg);
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
};
const useDeleteReview = (storeName: string, idx: string) => {
  const queryClient = useQueryClient();

  return useMutation(['deleteReview'], {
    mutationFn: () => deleteReview(storeName, idx, queryClient),
  });
};

export default useDeleteReview;
