import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { Response } from './responseInterfaces';
import { Like } from './useGetLike';

const deleteLike = async (queryClient: QueryClient) => {
  try {
    const queryData = queryClient.getQueryData<Like>(['like']);
    const idx = queryData?.idx.toString();

    const response = await axios.delete<Response<any>>(
      `${process.env.REAL_SERVER_URL}/like?idx=${idx}`,
      // { data: { idx } },
    );
    if (response.data.code === 200) {
      queryClient.invalidateQueries(['like']);
      return response.data;
    }
    throw new Error(response.data.msg);
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
};
const useDeleteLike = () => {
  const queryClient = useQueryClient();
  return useMutation(['deleteLike'], {
    mutationFn: () => deleteLike(queryClient),
  });
};

export default useDeleteLike;
