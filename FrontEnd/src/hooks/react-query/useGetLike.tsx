import axios, { AxiosError } from 'axios';
import { Response } from './responseInterfaces';
import { useQuery } from '@tanstack/react-query';

export interface Like {
  idx: string;
  memberIdx: string;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
}
const likeFetch = async (
  memberIdx: string,
  name: string,
  latitude: string,
  longitude: string,
) => {
  try {
    const response = await axios.get<Response<Like[]>>(
      `${process.env.REAL_SERVER_URL}/like/search?memberIdx=${memberIdx}&name=${name}&latitude=${latitude}&longitude=${longitude}`,
    );
    return response.data.data[0] || null;
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
};

const useGetLike = (name: string, latitude: string, longitude: string) => {
  // TODO: recoil에 저장된 memberIdx 받아오도록 변경해야함.
  const memberIdx = '1';
  return useQuery(
    ['like'],
    () => likeFetch(memberIdx, name, latitude, longitude),
    { cacheTime: 0 },
  );
};

export default useGetLike;
