import React, { useCallback, useEffect } from 'react';
import useGetUserVisitedPlace from '@src/hooks/react-query/useGetUserVisitedPlace';
import { createSearchParams, useNavigate } from 'react-router-dom';
import useGetReviewByName from '@src/hooks/react-query/useGetReviewByName';

interface VisitedListItemProps {
  place: any;
}

const VisitedListItem = ({ place }: VisitedListItemProps) => {
  const navigate = useNavigate();
  const btnStyle = {
    write: `bg-primary1 text-white`,
    view: `bg-gray3 text-gray1`,
  };
  const { data: isVisitedPlace, refetch: isVisitedRefetch } =
    useGetUserVisitedPlace(place.placeName, place.la, place.lo, false);

  useEffect(() => {
    isVisitedRefetch();
    console.log(isVisitedPlace, place.placeName);
  }, [isVisitedPlace, place.placeName]);

  const onClickReviewWrite = () => {
    if (isVisitedPlace) {
      const searchParam = createSearchParams({
        name: place.placeName,
        latitude: place.la,
        longitude: place.lo,
      });
      navigate({
        pathname: '/review',
        search: `?${searchParam}`,
      });
    }
    //리뷰가 존재하지 않는다면 리뷰 작성으로 이동
    else {
      navigate(`/review/edit`, {
        state: {
          name: place.placeName,
          address: place.address,
          latitude: place.la,
          longitude: place.lo,
        },
      });
    }
  };

  return (
    <div className="flex justify-between">
      {place.placeName}
      <button
        className={`rounded bg-primary1 px-2 py-1 text-body3 ${
          isVisitedPlace ? btnStyle.view : btnStyle.write
        }`}
        onClick={onClickReviewWrite}
      >
        {isVisitedPlace ? '리뷰 보기' : '리뷰 쓰기'}
      </button>
    </div>
  );
};

export default VisitedListItem;
