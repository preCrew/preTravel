import { useNavigate } from 'react-router-dom';

import { RatingNum } from '@src/components/common/Rating';
import TopBar from '@src/components/common/TobBar';
import TopText from '@src/components/common/Text/TopText';
import Review from '@src/components/Review';
import useSearchParamsWithError from '@src/hooks/useSearchParamsWithError';
import useGetReviewByName from '@src/hooks/react-query/useGetReviewByName';
import Column from '@src/components/common/FlexBox/Column';
import tw from 'twin.macro';
import { useEffect } from 'react';

interface ReviewViewPageProps {
  idx: string;
  name: string;
  latitude: string;
  longitude: string;
}

const ReviewViewPage = () => {
  const locationState = useSearchParamsWithError<ReviewViewPageProps>(
    ['name', 'latitude', 'longitude'],
    () => {
      navigate('/');
    },
  );
  const navigate = useNavigate();

  const { data: reviewData, refetch: refetchReviews } = useGetReviewByName(
    locationState.name,
    locationState.latitude,
    locationState.longitude,
  );

  useEffect(() => {
    refetchReviews();
  }, []);

  const handleClickBackButton = () => {
    navigate(-2);
  };

  return (
    <div css={tw`w-h-full p-5`}>
      <TopBar onClickBackButton={handleClickBackButton}>
        <TopText>{locationState.name}</TopText>
      </TopBar>
      <Column
        gap={80}
        css={tw`pt-[70px]`}
      >
        {reviewData?.map(review => (
          <Review
            key={review.idx}
            rating={parseInt(review.star) as RatingNum}
            review={review}
          />
        ))}
      </Column>
    </div>
  );
};

export default ReviewViewPage;
