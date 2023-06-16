import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import useDeleteReview from '@src/hooks/react-query/useDeleteReview';
import { IReview } from '@src/hooks/react-query/useGetReview';

import Column from '../common/FlexBox/Column';
import Rating, { RatingNum } from '../common/Rating';
import Row from '../common/FlexBox/Row';
import TextButton from '../common/Button/TextButton';
import ImageViewer from '../ImageViewer';

interface ReviewProps {
  rating: RatingNum;
  review: IReview;
}

const Review = ({ rating, review }: ReviewProps) => {
  // console.log('!: ', review);
  const navigate = useNavigate();
  const { mutate: mutateDeleteReview } = useDeleteReview(
    review.name,
    review.idx,
  ); //서버에서 리뷰 삭제하는 쿼리

  const handleClickDelete = () => {
    mutateDeleteReview();
    alert('리뷰가 정상적으로 삭제되었습니다. ');
  };

  const handleClickModify = () => {
    navigate(`/review/edit`, {
      state: review,
    });
  };
  return (
    <>
      <Column gap={20}>
        <Row css={tw`items-center justify-between`}>
          <Rating
            rating={rating}
            starSize={5}
            noText
          />
          <Row
            gap={2}
            css={tw`text-sm`}
          >
            <TextButton onClick={handleClickModify}>수정</TextButton>
            <p css={tw`select-none`}>|</p>
            <TextButton onClick={handleClickDelete}>삭제</TextButton>
          </Row>
        </Row>

        <ImageViewer images={review.file} />

        <Row css={tw`justify-between items-center`}>
          <p css={tw`text-body3 text-gray1`}>{review.createDate}</p>
          <p css={tw`bg-primary4 rounded-full p-1.5 text-white text-body3`}>
            in {review.address.split(' ')[1]}
          </p>
        </Row>

        <div css={tw`text-body1 h-[100px] line-clamp-6 `}>
          {review.contents}
        </div>
      </Column>
    </>
  );
};

export default Review;
