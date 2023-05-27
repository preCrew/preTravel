import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import tw from 'twin.macro';

import { File } from '@src/hooks/react-query/useAddImages';
import useOnChange from '@src/hooks/useOnChange';
import useReviewUpdateQuery from '@src/hooks/react-query/useReviewUpdateQuery';

import Row from '@src/components/common/FlexBox/Row';
import Column from '@src/components/common/FlexBox/Column';
import Rating, { RatingNum } from '@src/components/common/Rating';
import UploadImage from '@src/components/common/UploadImage';
import CheckBox from '@src/components/common/CheckBox';
import FormText from '@src/components/common/Text/FormText';
import Button from '@src/components/common/Button';
import TopBar from '@src/components/common/TobBar';
import TopText from '@src/components/common/Text/TopText';
interface ReviewEditPageProps {
  idx?: string;
  rating?: RatingNum;
  images?: File[];
  isRevisit?: boolean;
  review?: string;
  name?: string;
  latitude?: string;
  longitude?: string;
}

const ReviewEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = useMemo(
    () => location.state as ReviewEditPageProps,
    [location.state],
  );

  const [state, setState] = useState<{
    rating: RatingNum;
    isRevisit: boolean;
    imgNum: number;
  }>({
    rating: locationState.rating ?? 1,
    isRevisit: locationState.isRevisit ?? false,
    imgNum: locationState.images?.length ?? 0,
  });

  const decreseImgNum = () => {
    setState(prev => ({ ...prev, imgNum: prev.imgNum - 1 }));
  };

  const increseImgNum = (imgNum: number) => {
    setState(prev => ({ ...prev, imgNum: prev.imgNum + imgNum }));
  };

  const handleChangeRating = (rating: RatingNum) => {
    setState(prev => ({ ...prev, rating }));
  };

  const handleClickRevisitCheckBox = () => {
    setState(prev => ({ ...prev, isRevisit: !prev.isRevisit }));
  };

  const { onChange: onChangeText, value: textValue } = useOnChange();
  const [files, setFiles] = useState<File[]>([]);

  const { mutate: updateReview, isSuccess: isSuccessUpdate } =
    useReviewUpdateQuery(
      state.isRevisit,
      state.rating,
      textValue,
      files,
      locationState.idx,
    );

  useEffect(() => {
    if (isSuccessUpdate) {
      alert(`리뷰가 정상적으로 등록되었습니다.`);
      navigate(`/review`, {
        state: {
          idx: locationState.idx,
          name: locationState.name,
          latitude: locationState.latitude,
          longitude: locationState.longitude,
        },
      });
    }
  }, [isSuccessUpdate]);

  const handleClickSubmitButton = async () => {
    updateReview();
  };

  const handleClickBackButton = () => {
    navigate(-1);
  };
  return (
    <>
      <TopBar onClickBackButton={handleClickBackButton}>
        <TopText>{locationState.name}</TopText>
      </TopBar>

      <Column css={tw`w-h-full gap-14`}>
        <Column>
          <FormText required>만족도</FormText>
          <Rating
            rating={state.rating}
            onChange={handleChangeRating}
            starSize={12}
          />
        </Column>

        <Column css={tw`gap-5 relative `}>
          <FormText placeHolder="리뷰 사진을 업로드 해주세요. (최대 10장)">
            사진 업로드
          </FormText>
          <UploadImage
            imgFiles={files}
            setImgFiles={setFiles}
            imgNum={state.imgNum}
            decreseImgNum={decreseImgNum}
            increseImgNum={increseImgNum}
          />
        </Column>

        <Column gap={4}>
          <FormText required>재방문 의사</FormText>
          <label>
            <Row
              gap={2}
              css={tw`items-center `}
            >
              <CheckBox onClick={handleClickRevisitCheckBox} />
              <span css={tw`text-body3 cursor-pointer select-none`}>
                다음에도 방문하고 싶어요😃
              </span>
            </Row>
          </label>
        </Column>

        <Column css={tw`flex-1 w-h-full`}>
          <FormText required>후기 작성</FormText>
          <textarea
            onChange={onChangeText}
            value={textValue}
            css={tw`w-h-full text-body1 border border-gray1 rounded-2xl p-4 resize-none flex-1`}
          />
        </Column>

        <Button
          type="large"
          color="primary1"
          onClick={handleClickSubmitButton}
        >
          등록
        </Button>
      </Column>
    </>
  );
};

export default ReviewEditPage;
