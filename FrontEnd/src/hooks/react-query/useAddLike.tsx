import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { Response } from './responseInterfaces';
import { Like } from './useGetLike';

const addLike = async (
  memberIdx: string,
  name: string,
  address: string,
  latitude: string,
  longitude: string,
  queryClient: QueryClient,
) => {
  try {
    const response = await axios.post<Response<Like>>(
      `${process.env.REAL_SERVER_URL}/like?memberIdx=${memberIdx}&name=${name}&latitude=${latitude}&longitude=${longitude}&address=${address}`,
    );
    if (response.data.code === 200) {
      // queryClient.invalidateQueries(['like']);
      return response.data.data;
    }
    throw new Error(response.data.msg);
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
};
const useAddLike = (
  // memberIdx: string,
  name: string,
  address: string,
  latitude: string,
  longitude: string,
) => {
  // TODO: recoil에 저장된 memberIdx 받아오도록 변경해야함.
  const memberIdx = '1';
  const queryClient = useQueryClient();

  return useMutation(['addLike'], {
    mutationFn: () =>
      addLike(memberIdx, name, address, latitude, longitude, queryClient),
    onMutate: async (newData: Like) => {
      // const newData: Like = data as unknown as Like;
      const oldData = queryClient.getQueryData(['like']);
      // 우리 update overwrite하지 않기 위해 미리 취소
      await queryClient.cancelQueries(['like']);
      // 미리 UI에 적용시켜 놓음
      queryClient.setQueryData(['like'], newData);
      // 만약 에러나서 롤백 되면 이전 것을 써놓음.
      return () => queryClient.setQueryData(['like'], oldData);
    },
    onError: (error, variable, rollback) => {
      if (rollback) rollback();
      else console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['like']);
    },
  });
};

export default useAddLike;
