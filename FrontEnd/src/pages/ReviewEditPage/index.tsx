import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import tw from 'twin.macro';

import { File } from '@src/hooks/react-query/useAddImages';
import { IReview } from '@src/hooks/react-query/useGetReview';
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

const ReviewEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = useMemo(
    () => (location.state ? (location.state as IReview) : ({} as IReview)),
    [location.state],
  );

  const [state, setState] = useState<{
    rating: RatingNum;
    isRevisit: boolean;
    imgNum: number;
  }>({
    rating: locationState?.star ? (+locationState?.star as RatingNum) : 1,
    isRevisit: locationState?.revisit === 'true' ?? false,
    imgNum: locationState?.file?.length ?? 0,
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

  const { onChange: onChangeText, value: textValue } = useOnChange(
    locationState.contents,
  );
  const [files, setFiles] = useState<File[]>([]);

  const { mutate: updateReview, isSuccess: isSuccessUpdate } =
    useReviewUpdateQuery(
      {
        ...locationState,
        contents: textValue,
        star: state.rating.toString(),
        revisit: state.isRevisit ? 'true' : 'false',
      },
      files,
    );

  useEffect(() => {
    if (isSuccessUpdate) {
      const searchParam = createSearchParams({
        name: locationState.name,
        latitude: locationState.latitude,
        longitude: locationState.longitude,
      });

      alert(`리뷰가 정상적으로 등록되었습니다.`);
      navigate({
        pathname: '/review',
        search: `?${searchParam}`,
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

      <Column css={tw`mt-16 w-h-full gap-14 content-inner`}>
        <Column>
          <FormText required>만족도</FormText>
          <Rating
            rating={state.rating}
            onChange={handleChangeRating}
            starSize={12}
          />
        </Column>

        <Column css={tw`relative gap-5 `}>
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
              <span css={tw`cursor-pointer select-none text-body3 pl-9`}>
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
            css={tw`flex-1 p-4 border resize-none w-h-full text-body1 border-gray1 rounded-2xl`}
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
