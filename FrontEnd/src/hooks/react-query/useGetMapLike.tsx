import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
export interface ILikeMapData {
  memberIdx: string | null;
  smallLa: string | null;
  largeLa: string | null;
  smallLo: string | null;
  largeLo: string | null;
}
// https://port-0-pretravel-ll32glc6adwo3.gksl2.cloudtype.app/like

const areaMarekerFunc = async (data: ILikeMapData) => {
  try {
    const response = await axios.get(
      `${process.env.REAL_SERVER_URL}/like/map?memberIdx=${data.memberIdx}&smallLa=${data.smallLa}&largeLa=${data.largeLa}&smallLo=${data.smallLo}&largeLo=${data.largeLo}`,
    );
    return response.data.data;
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
};

const useGetMapLike = (data: ILikeMapData) => {
  //const { setGetLike } = useMarkerState();

  return useQuery(['getMapLike'], () => areaMarekerFunc(data), {
    enabled: false,
    // cacheTime: 50000,
    // staleTime: 50000,
    onSuccess: () => {
      //console.log('성공');
      //setGetLike(true);
    },
  });
};

export default useGetMapLike;
