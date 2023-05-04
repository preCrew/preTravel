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
      queryClient.invalidateQueries(['like']);
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
  });
};

export default useAddLike;
