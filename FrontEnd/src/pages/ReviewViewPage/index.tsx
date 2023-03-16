import { useParams } from 'react-router-dom';

import tw from 'twin.macro';

import Column from '@src/components/common/FlexBox/Column';
import Row from '@src/components/common/FlexBox/Row';
import Rating from '@src/components/common/Rating';
import ImageViewer from '@src/components/ImageViewer';
import Slider from '@src/components/common/Slider';

interface ReviewViewPageProps {}

const images = [
  'https://image.idus.com/image/files/8f5dbdb64253465a941757e82e530471_512.jpg',
  // 'https://post-phinf.pstatic.net/MjAyMjA0MDFfMjM0/MDAxNjQ4ODA4MjE5NjYy.Z6I4_cbWtQ6w7ZzyLWKSubrOcTuBi-ZFvWhfpByOGGwg.lIc0Vg0ZOdOiZht3Brd_qn1ox2_E5n0JqrbAc-shFXIg.PNG/%EC%82%AC%EB%9E%8C_%EA%B7%B8%EB%A6%BC_8.png?type=w1200',
  // 'https://storage.enuri.info/pic_upload/knowbox2/10564551120181120d8dc9de9-a59c-4bbf-841d-61c3e375cdbf.jpg',
  'https://free4kwallpapers.com/uploads/wallpaper/park-at-night----wallpaper-1024x768-wallpaper.jpg',
  'https://free4kwallpapers.com/uploads/wallpaper/night-sky----wallpaper-1024x768-wallpaper.jpg',
];
const ReviewViewPage = ({}: ReviewViewPageProps) => {
  const { id } = useParams();
  // const {title, rating, images, date, region, review} = useQuery //서버에서 리뷰데이터 받아오는 쿼리

  return (
    <Column gap={20}>
      <Rating
        rating={3}
        starSize={5}
        noText
      />

      <ImageViewer images={images} />

      <Row css={tw`justify-between items-center`}>
        <p css={tw`text-body3 text-gray1`}>2022.02</p>
        <p css={tw`bg-primary4 rounded-full p-1.5 text-white text-body3`}>
          in 경주
        </p>
      </Row>

      <div css={tw`text-body1 h-full`}>
        여기에 리뮤 내용 여기에 리뮤 내용 여기에 리뮤 내용 여기에 리뮤 내용
        여기에 리뮤 내용 여기에 리뮤 내용 여기에 리뮤 내용 여기에 리뮤 내용
        여기에 리뮤 내용 여기에 리뮤 내용 여기에 리뮤 내용 여기에 리뮤 내용
        여기에 리뮤 내용 여기에 리뮤 내용 여기에 리뮤 내용 여기에 리뮤 내용
      </div>
    </Column>
  );
};

export default ReviewViewPage;
