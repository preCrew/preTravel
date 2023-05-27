import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useDeleteReview from '@src/hooks/react-query/useDeleteReview';
import useGetReveiw, { IReview } from '@src/hooks/react-query/useGetReview';

import { RatingNum } from '@src/components/common/Rating';
import TopBar from '@src/components/common/TobBar';
import TopText from '@src/components/common/Text/TopText';
import Review from '@src/components/Review';

interface ReviewViewPageProps {
  idx: string;
  name: string;
  latitude: string;
  longitude: string;
}

const ReviewViewPage = () => {
  const location = useLocation();
  const locationState = useMemo(
    () => location.state as ReviewViewPageProps,
    [location.state],
  );

  const navigate = useNavigate();

  const { data: reviewData, isError: isErrorGetReview } = useGetReveiw(
    locationState.name,
    locationState.latitude,
    locationState.longitude,
  );
  console.log(reviewData, locationState);

  const { mutate: mutateDeleteReview } = useDeleteReview(locationState.idx); //서버에서 리뷰 삭제하는 쿼리

  const handleClickDelete = () => {
    mutateDeleteReview();
    alert('리뷰가 정상적으로 삭제되었습니다. 첫 페이지로 돌아갑니다.');
    navigate('/');
  };

  const handleClickModify = (review: IReview) => {
    navigate(`/review/edit`, {
      state: {
        name: review.name,
        latitude: review.latitude,
        longitude: review.longitude,
        idx: review.idx,
        rating: review.star,
        images: review.dir,
        isRevisit: review.revisit,
        review: review.contents,
      },
    });
  };
  const handleClickBackButton = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (isErrorGetReview) {
      alert('잘못된 페이지입니다. 이전페이지로 돌아갑니다.');
      navigate(-1);
    }
  }, []);

  return (
    <>
      <TopBar onClickBackButton={handleClickBackButton}>
        <TopText>{locationState.name}</TopText>
      </TopBar>
      {reviewData?.map(review => (
        <Review
          city={review.city}
          rating={parseInt(review.star) as RatingNum}
          images={review.dir}
          contents={review.contents}
          onClickModify={() => handleClickModify(review)}
          onClickDelete={handleClickDelete}
          createDate={review.createDate}
        />
      ))}
    </>
  );
};

export default ReviewViewPage;
