import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import tw from 'twin.macro';
import useDeleteReview from '@src/hooks/react-query/useDeleteReview';

import Column from '@src/components/common/FlexBox/Column';
import Row from '@src/components/common/FlexBox/Row';
import Rating from '@src/components/common/Rating';
import { RatingNum } from '@src/components/common/Rating';
import ImageViewer from '@src/components/ImageViewer';
import TextButton from '@src/components/common/Button/TextButton';
import useGetReveiw from '@src/hooks/react-query/useGetReview';
import TopBar from '@src/components/common/TobBar';
import TopText from '@src/components/common/Text/TopText';
import useLocationState from '@src/hooks/recoil/useLocationState';

interface ReviewViewPageProps {}

const ReviewViewPage = ({}: ReviewViewPageProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { setSelectData } = useLocationState();

  const { data: reviewData, isError } = useGetReveiw(id ?? ''); //서버에서 리뷰데이터 받아오는 쿼리
  const { mutate: mutateDeleteReview } = useDeleteReview(id ?? ''); //서버에서 리뷰 삭제하는 쿼리

  const handleClickDelete = () => {
    mutateDeleteReview();
    alert('리뷰가 정상적으로 삭제되었습니다. 첫 페이지로 돌아갑니다.');
    navigate('/');
  };
  const handleClickModify = () => {
    navigate(`/review/edit`, {
      state: {
        topBarName: reviewData?.name,
        idx: id,
        rating: reviewData?.star,
        images: reviewData?.originFile,
        isRevisit: reviewData?.revisit,
        review: reviewData?.contents,
      },
    });
  };
  const handleClickBackButton = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (isError) {
      alert('잘못된 페이지입니다. 이전페이지로 돌아갑니다.');
      navigate(-1);
    }
    // 만약 주소로 들어왔다면 selectData를 채워줘야함.
    setSelectData({
      name: reviewData?.name ?? '',
      address: reviewData?.address ?? '',
      y: reviewData?.latitude ?? '',
      x: reviewData?.longitude ?? '',
    });
  }, []);

  return (
    <>
      <TopBar onClickBackButton={handleClickBackButton}>
        <TopText>{reviewData?.name}</TopText>
      </TopBar>
      <Column gap={20}>
        <Row css={tw`items-center justify-between`}>
          <Rating
            rating={parseInt(reviewData?.star || '1') as RatingNum}
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

        <ImageViewer images={reviewData?.file} />

        <Row css={tw`justify-between items-center`}>
          <p css={tw`text-body3 text-gray1`}>{reviewData?.createDate}</p>
          <p css={tw`bg-primary4 rounded-full p-1.5 text-white text-body3`}>
            in {reviewData?.address}
          </p>
        </Row>

        <div css={tw`text-body1 h-full`}>{reviewData?.contents}</div>
      </Column>
    </>
  );
};

export default ReviewViewPage;
