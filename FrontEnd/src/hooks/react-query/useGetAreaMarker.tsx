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
  //  console.log(memberIdx, smallLa, largeLa, smallLo, largeLo);
  // const params = new FormData();
  // params.append('memberIdx', '12');
  // params.append('smallLa', data.get('smallLa'));
  // params.append('largeLa', data.get('largeLa'));
  // params.append('smallLo', data.get('smallLo'));
  // params.append('largeLo', data.get('largeLo'));
  try {
    const response = await axios.get(
      `https://port-0-pretravel-ll32glc6adwo3.gksl2.cloudtype.app/like/map?memberIdx=${data.memberIdx}&smallLa=${data.smallLa}&largeLa=${data.largeLa}&smallLo=${data.smallLo}&largeLo=${data.largeLo}`,
    );

    return response.data;
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
};

const useGetAreaMarker = (data: any) =>
  useQuery(['getArea'], () => areaMarekerFunc(data), {
    enabled: false,
    //queryFn: ,
  });

export default useGetAreaMarker;
