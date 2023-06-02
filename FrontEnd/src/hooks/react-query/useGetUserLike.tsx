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

const areaMarekerFunc = async (data: any) => {
  console.log(data);
  try {
    const response = await axios.get(
      `${process.env.REAL_SERVER_URL}/like/map?memberIdx=${data.memberIdx}&smallLa=${data.smallLa}&largeLa=${data.largeLa}&smallLo=${data.smallLo}&largeLo=${data.largeLo}`,
    );
    //console.log(response.data);
    return response.data;
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
};

const useGetUserLike = (data: any) => {
  //const { setGetLike } = useMarkerState();

  return useQuery(['getAreaLike', data], () => areaMarekerFunc(data), {
    enabled: false,
    onSuccess: () => {
      console.log('성공');
      //setGetLike(true);
    },
  });
};

export default useGetUserLike;
