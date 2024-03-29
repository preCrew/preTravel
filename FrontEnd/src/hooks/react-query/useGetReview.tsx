import axios from 'axios';
import { Response } from './responseInterfaces';
import { useQuery } from '@tanstack/react-query';

export interface IReviewFile {
  idx: string;
  boardName: string;
  boardIdx: string;
  fileDir: string;
  fileName: string;
}
export interface IReview {
  idx: string;
  memberIdx: string;
  name: string;
  address: string;
  city: string;
  star: string;
  latitude: string;
  longitude: string;
  revisit: string;
  contents: string;
  createDate: string;
  file: IReviewFile[];
  dir?: string[];
}
const reviewFetch = async (
  storeName: string,
  latitude: string,
  longitude: string,
) => {
  const requestURL = new URLSearchParams(
    `${process.env.REAL_SERVER_URL}/review/detail`,
  );
  requestURL.append('name', storeName);
  requestURL.append('latitude', latitude);
  requestURL.append('longitude', longitude);

  try {
    const response = await axios.get<Response<IReview[]>>(
      requestURL.toString(),
    );
    if (response.data.code !== 200) {
      throw new Error('리뷰 상세 조회 실패');
    }

    const mapedResponse = response.data.data.map(res => ({
      ...res,
      createDate: res.createDate.slice(0, 10).replaceAll('-', '.'),
      dir: res.file.map(item => item.fileDir),
    }));

    return mapedResponse;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

const useGetReview = (storeName: string, latitude: string, longitude: string) =>
  useQuery(
    ['review', storeName, latitude, longitude],
    () => reviewFetch(storeName, latitude, longitude),
    {
      onError: err => console.log(err),
      // cacheTime: 0,
      staleTime: 0,
      enabled: false,
    },
  );

export default useGetReview;
