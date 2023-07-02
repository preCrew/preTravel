import { userAtom } from '@src/recoil/user/atom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { Response } from './responseInterfaces';

interface IUserVisited {
  idx: number;
  sctIdx: string;
  seq: number;
  day: string;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  createDate: string;
}
const getData = async (
  storeName: string,
  latitude: string,
  longitude: string,
  userIdx: string,
) => {
  try {
    const reqParams = new URLSearchParams();
    reqParams.append('name', storeName);
    reqParams.append('latitude', latitude);
    reqParams.append('longitude', longitude);
    reqParams.append('memberIdx', userIdx);

    const response = await axios.get<Response<IUserVisited[]>>(
      `${process.env.REAL_SERVER_URL}/spot/name`,
      { params: reqParams },
    );

    if (response.data.code !== 200) {
      throw new Error('유저가 해당 장소 방문여부를 받는데 실패했습니다.');
    }

    if (response.data.data.length === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
  }
};
const useGetUserVisitedPlace = (
  storeName: string,
  latitude: string,
  longitude: string,
  enabledExist: boolean,
) => {
  const { id: memberIdx } = useRecoilValue(userAtom);

  return useQuery(
    ['useGetUserVisitedPlace', memberIdx],
    () => getData(storeName, latitude, longitude, memberIdx),
    {
      enabled: enabledExist,
      onSuccess: data => {
        console.log(data);
      },
    },
  );
};

export default useGetUserVisitedPlace;
