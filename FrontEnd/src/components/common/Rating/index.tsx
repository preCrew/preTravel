import tw from 'twin.macro';
import Column from '../FlexBox/Column';
import Row from '../FlexBox/Row';
import Star from './Star';

export type RatingNum = 1 | 2 | 3 | 4 | 5;
interface RatingProps {
  rating: RatingNum;
  // setRating?: (rating: RatingNum) => void;
  onChange?: (rating: RatingNum) => void;
  noText?: boolean;
  starSize: number;
}

const message = [
  '',
  '별로였어요 ㅠ-ㅠ',
  '그냥 그랬어요 ㅠ^ㅠ',
  '보통이었어요 ㅇ_ㅇ',
  '좋았어요 ^_^',
  '최고였어요 >_< 짱!',
];

const ratingArr: RatingNum[] = [1, 2, 3, 4, 5];

const Rating = ({ rating, onChange, noText, starSize }: RatingProps) => {
  return (
    <Column>
      <Row css={tw`gap-2 `}>
        {ratingArr.map(r =>
          r <= rating ? (
            <Star
              key={r}
              isFilled
              onClick={() => onChange?.(r)}
              size={starSize}
              canClick={noText ? false : true}
            />
          ) : (
            <Star
              key={r}
              onClick={() => onChange?.(r)}
              size={starSize}
              canClick={noText ? false : true}
            />
          ),
        )}
      </Row>
      {!noText && (
        <span css={tw`text-primary1 text-body2Bold select-none`}>
          {message[rating]}
        </span>
      )}
    </Column>
  );
};

export default Rating;
