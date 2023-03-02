import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import tw from 'twin.macro';

import useOnChange from '@src/hooks/useOnChange';
import useUploadFiles from '@src/hooks/useUploadFiles';
import useReviewUpdateQuery from '@src/hooks/react-query/useReviewUpdateQuery';
import useLocationState from '@src/hooks/recoil/useLocationState';

import Row from '@src/components/common/FlexBox/Row';
import Column from '@src/components/common/FlexBox/Column';
import Rating, { RatingNum } from '@src/components/common/Rating';
import UploadImage from '@src/components/common/UploadImage';
import CheckBox from '@src/components/common/CheckBox';
import FormText from '@src/components/common/Text/FormText';
import Button from '@src/components/common/Button';
import useModal from '@src/hooks/useModal';
import LoadingModal from '@src/components/Modal/LoadingModal';
interface ReviewEditPageProps {}

const ReviewEditPage = ({}: ReviewEditPageProps) => {
  const navigate = useNavigate();
  const [rating, setRating] = useState<RatingNum>(1);
  const [isRevisit, setIsRevisit] = useState<boolean>(false);

  const { onChange: onChangeText, value: textValue } = useOnChange();
  const { files: imgFiles, setFiles: setImgFiles } = useUploadFiles();

  const { locationState } = useLocationState();
  const { Modal, showModal } = useModal('loadingModal');

  const { data, mutate, isLoading, isSuccess } = useReviewUpdateQuery(
    isRevisit,
    rating,
    textValue,
    imgFiles,
    locationState.region,
  );

  useEffect(() => {
    if (isSuccess) {
      alert(`리뷰가 등록되었습니다. \nfrom Server: ${data}`);
      navigate(`/review/${data}`);
    }
  }, [isSuccess]);

  const handleClickSubmitButton = async () => {
    showModal();
    mutate();
  };
  return (
    <>
      {isLoading && (
        <Modal noClose>
          <LoadingModal text="리뷰를 등록 중입니다..." />
        </Modal>
      )}
      <Column css={tw`w-h-full gap-14`}>
        <Column>
          <FormText required>만족도</FormText>
          <Rating
            rating={rating}
            setRating={setRating}
            starSize={12}
          />
        </Column>

        <Column css={tw`gap-5 relative `}>
          <FormText placeHolder="리뷰 사진을 업로드 해주세요. (최대 10장)">
            사진 업로드
          </FormText>
          <UploadImage
            files={imgFiles}
            setFiles={setImgFiles}
          />
        </Column>

        <Column gap={4}>
          <FormText required>재방문 의사</FormText>
          <label>
            <Row
              gap={2}
              css={tw`items-center `}
            >
              <CheckBox
                onClick={() => {
                  setIsRevisit(prev => !prev);
                }}
              />
              <span css={tw`text-body3 cursor-pointer select-none`}>
                다음에도 방문하고 싶어요😃
              </span>
            </Row>
          </label>
        </Column>

        <Column css={tw`flex-1`}>
          <FormText required>후기 작성</FormText>
          <textarea
            onChange={onChangeText}
            value={textValue}
            css={tw`w-h-full text-body1 border border-gray1 rounded-2xl p-4 resize-none`}
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
      {/* </Suspense> */}
    </>
  );
};

export default ReviewEditPage;
