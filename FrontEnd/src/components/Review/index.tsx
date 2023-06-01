import tw from 'twin.macro';
import Column from '../common/FlexBox/Column';
import Rating, { RatingNum } from '../common/Rating';
import Row from '../common/FlexBox/Row';
import TextButton from '../common/Button/TextButton';
import ImageViewer from '../ImageViewer';

interface ReviewProps {
  rating: RatingNum;
  onClickModify: () => void;
  onClickDelete: () => void;
  images: string[];
  city: string;
  createDate: string;
  contents: string;
}

const Review = ({
  rating,
  onClickModify,
  onClickDelete,
  images,
  createDate,
  city,
  contents,
}: ReviewProps) => {
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
            <TextButton onClick={onClickModify}>수정</TextButton>
            <p css={tw`select-none`}>|</p>
            <TextButton onClick={onClickDelete}>삭제</TextButton>
          </Row>
        </Row>

        <ImageViewer images={images} />

        <Row css={tw`justify-between items-center`}>
          <p css={tw`text-body3 text-gray1`}>{createDate}</p>
          <p css={tw`bg-primary4 rounded-full p-1.5 text-white text-body3`}>
            in {city}
          </p>
        </Row>

        <div css={tw`text-body1 h-full`}>{contents}</div>
      </Column>
    </>
  );
};

export default Review;
