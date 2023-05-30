import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { Response } from './responseInterfaces';
// import { Like } from './useGetLike';

const deleteLike = async (idx: string) => {
  try {
    // const queryData = queryClient.getQueryData<Like>(['like']);
    // const idx = queryData?.idx.toString();
    // console.log('Q: ', queryData);

    const response = await axios.delete<Response<any>>(
      `${process.env.REAL_SERVER_URL}/like?idx=${idx.toString()}`,
    );
    if (response.data.code === 200) {
      return response.data.data;
    }
    throw new Error(response.data.msg);
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
};
const useDeleteLike = (idx: string) => {
  const queryClient = useQueryClient();
  return useMutation(['deleteLike'], {
    mutationFn: () => deleteLike(idx),
    onMutate: async () => {
      const oldData = queryClient.getQueryData(['like']);
      console.log('oldData: ', oldData);
      // 우리 update overwrite하지 않기 위해 미리 취소
      await queryClient.cancelQueries(['like']);
      // 미리 UI에 적용시켜 놓음
      queryClient.setQueryData(['like'], '');
      // 만약 에러나서 롤백 되면 이전 것을 써놓음.
      return () => queryClient.setQueryData(['like'], oldData);
    },
    onError: (error, variable, rollback) => {
      console.log(error);
      if (rollback) rollback();
      else console.log(error);
    },
    onSettled: () => {
      console.log('!!');
      queryClient.invalidateQueries(['like']);
    },
  });
};

export default useDeleteLike;
