import { Suspense, useEffect } from 'react';
import tw from 'twin.macro';
import Data from './Data';
import { UseInfiniteQueryResult } from '@tanstack/react-query';
import useInfinityScroll from '@src/hooks/useInfinityScroll';
import LoadingData from './LoadingData';

export type SearchOvelayInfinityQuery = (
  value: string,
) => UseInfiniteQueryResult<
  {
    boardPage: {
      [key: string]: string;
      idx: string;
      body: string;
    }[];
    currentPage: number;
    isLast: boolean;
  },
  unknown
>;
interface AsyncDataListProps {
  className?: string;
  searchValue: string;
  isSubmit: boolean;
  infiniteQuery: SearchOvelayInfinityQuery;
  onClickListItem: (data: unknown) => Promise<void>;
}

const AsyncDataList = ({
  className,
  searchValue,
  isSubmit,
  infiniteQuery,
  onClickListItem,
}: AsyncDataListProps) => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } =
    infiniteQuery(searchValue);

  const { InfiniteScrollPositionComponent } = useInfinityScroll(() => {
    if (!hasNextPage) return;
    fetchNextPage();
  });

  useEffect(() => {
    if (!isSubmit) return;
    refetch();
  }, [isSubmit]);

  return (
    <div
      css={tw`text-body1 select-none cursor-pointer bg-white`}
      className={className}
    >
      {data?.pages
        .flatMap(page => page?.boardPage)
        .map(v => (
          <Data
            key={v.idx}
            onClickData={() => onClickListItem(v)}
          >
            {v.body}
          </Data>
        ))}

      <InfiniteScrollPositionComponent />
      {isFetchingNextPage && <LoadingData />}
    </div>
  );
};

export default AsyncDataList;
