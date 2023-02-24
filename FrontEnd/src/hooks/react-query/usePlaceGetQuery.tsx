import { useInfiniteQuery } from '@tanstack/react-query';
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
      is_end: boolean;
    };
  };
}
const getData = async (pageParam: number, place: string) => {
  const url = `${process.env.REAL_SERVER_URL}/map/place?keyword=${place}&page=${pageParam}`;
  const res = await axios.get<RegionResponseData>(url);

  const data = res.data.data.reuslt
    .filter(r => r.roadAddress)
    .map(r => ({
      ...r,
      idx: r.roadAddress,
      body: r.name,
    }));

  return {
    boardPage: data,
    currentPage: pageParam + 1,
    isLast: res.data.data.page.is_end,
  };
};

const usePlaceGetQuery = (region: string, place: string) => {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetched,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery(
    ['place', region, place],
    ({ pageParam = 1 }) => getData(pageParam, `${region} ${place}`),
    {
      getNextPageParam: lastPage => {
        if (lastPage?.isLast) return undefined;

        return lastPage?.currentPage;
      },
      enabled: false,
    },
  );

  return {
    data: data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetched,
    isFetching,
    hasNextPage,
  };
};

export default usePlaceGetQuery;
