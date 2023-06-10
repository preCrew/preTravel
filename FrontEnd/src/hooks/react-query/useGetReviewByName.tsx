import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Response } from './responseInterfaces';
import { IReview } from './useGetReview';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@src/recoil/user/atom';

// name=하남옹달샘작은도서관&latitude=38.053719143256146&longitude=127.67157547343288

const getData = async (
  storeName: string,
  latitude: string,
  longitude: string,
  memberIdx: string,
  queryClient: QueryClient,
) => {
  const reqParams = new URLSearchParams();
  reqParams.append('name', storeName);
  reqParams.append('latitude', latitude);
  reqParams.append('longitude', longitude);
  reqParams.append('memberIdx', memberIdx);

  try {
    const response = await axios.get<Response<IReview[]>>(
      `${process.env.REAL_SERVER_URL}/review/name`,
      { params: reqParams },
    );

    if (response.data.code !== 200) {
      throw new Error('리뷰를 받는데 실패했습니다.');
    }

    queryClient.invalidateQueries(['useGetReviewByName', storeName]);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
const useGetReviewByName = (
  storeName: string,
  latitude: string,
  longitude: string,
) => {
  const { id: memberIdx } = useRecoilValue(userAtom);
  const client = useQueryClient();

  return useQuery(
    ['useGetReviewByName', storeName],
    () => getData(storeName, latitude, longitude, memberIdx, client),
    { staleTime: 0, enabled: false },
  );
};

export default useGetReviewByName;
