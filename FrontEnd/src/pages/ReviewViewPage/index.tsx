import Column from '@src/components/common/FlexBox/Column';
import Rating from '@src/components/common/Rating';
import { useParams } from 'react-router-dom';

interface ReviewViewPageProps {}

const ReviewViewPage = ({}: ReviewViewPageProps) => {
  const { id } = useParams();
  // const {title, rating, images, date, region, review} = useQuery //서버에서 리뷰데이터 받아오는 쿼리

  return (
    <Column>
      <Rating
        rating={3}
        starSize={5}
        noText
      />
    </Column>
  );
};

export default ReviewViewPage;
