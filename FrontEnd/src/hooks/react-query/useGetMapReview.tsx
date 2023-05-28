import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
export interface ILikeMapData {
  memberIdx: string | null;
  smallLa: string | null;
  largeLa: string | null;
  smallLo: string | null;
  largeLo: string | null;
}

const areaMarekerFunc = async (data: any) => {
  try {
    const response = await axios.get(
      `${process.env.REAL_SERVER_URL}/review?memberIdx=${data.memberIdx}&smallLa=${data.smallLa}&largeLa=${data.largeLa}&smallLo=${data.smallLo}&largeLo=${data.largeLo}`,
    );
    //console.log(response.data);
    return response.data.data;
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
};

const useGetMapReview = (data: any) =>
  useQuery(['getAreaReview'], {
    enabled: false,
    // cacheTime: 50000,
    // staleTime: 50000,
    queryFn: () => areaMarekerFunc(data),
  });

export default useGetMapReview;
