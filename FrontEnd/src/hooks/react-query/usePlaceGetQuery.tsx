import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface PlaceData {
  idx: string;
  body: string;
  address: string;
  roadAddress: string;
  name: string;
  x: string;
  y: string;
}
interface PlaceDataExport {
  boardPage: PlaceData[];
  currentPage: number;
  isLast: boolean;
}
interface RegionResponseData {
  code: number;
  msg: string;
  data: {
    reuslt: PlaceData[];
    page: {
      total: number;
      size: string;
      page: string;
    };
  };
}
const getData = async (pageParam: number, place: string) => {
  // new Promise<PlaceDataExport>(async resolve => {
  try {
    const url = `${process.env.REAL_SERVER_URL}/map/place?keyword=${place}&page=${pageParam}`;
    const res = await axios.get<RegionResponseData>(url);

    const data = res.data.data.reuslt
      .filter(r => r.roadAddress)
      .map(r => ({
        ...r,
        idx: r.roadAddress,
        body: r.name,
      }));
    console.log(data.length, res.data.data.page.total);
    return {
      boardPage: data,
      currentPage: pageParam + 1,
      isLast: res.data.data.reuslt.length < 10,
    };
  } catch (e) {
    console.log(e);
  }
};
// );

// });
const usePlaceGetQuery = (place: string) => {
  const { data, fetchNextPage, remove } = useInfiniteQuery(
    ['place'],
    ({ pageParam = 1 }) => getData(pageParam, place),
    {
      getNextPageParam: lastPage => {
        if (lastPage?.isLast) return undefined;

        return lastPage?.currentPage;
      },
      enabled: false,
    },
  );

  return { data, fetchNextPage, remove };
};

export default usePlaceGetQuery;
