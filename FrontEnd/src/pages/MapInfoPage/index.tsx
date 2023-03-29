import { useNavigate } from 'react-router-dom';

import tw from 'twin.macro';
import BottomSheetWrap from '@src/components/scheduleDetail/BottomSheet/BottomSheetWrap';
import IconButton from '@src/components/common/Button/IconButton';
import TopBar from '@src/components/common/TobBar';
import Button from '@src/components/common/Button';
import useLocationState from '@src/hooks/recoil/useLocationState';
import TopText from '@src/components/common/Text/TopText';

interface MapInfoPageProps {}

const MapInfoPage = ({}: MapInfoPageProps) => {
  const navigate = useNavigate();
  const {
    locationState: { selectData },
  } = useLocationState();

  const handleClickBackButton = () => {
    navigate(-1);
  };

  const handleClickAddReviewButton = () => {
    navigate('/review/edit');
  };

  const handleClickAddScheduleButton = () => {};
  return (
    <>
      <TopBar onClickBackButton={handleClickBackButton}>
        <TopText>{selectData.name}</TopText>
      </TopBar>
      <BottomSheetWrap drag={true}>
        <div css={tw`p-2 flex flex-col items-center gap-3`}>
          <div css={tw`text-h5 `}>{selectData.roadAddress}</div>
          <div css={tw`w-30 h-30 flex-with-center bg-gray3 rounded-full`}>
            <IconButton type="heart" />
          </div>
          <div css={tw`w-full flex justify-evenly gap-5`}>
            <Button
              type="large"
              color="gray3"
              css={tw`text-black`}
              onClick={handleClickAddReviewButton}
            >
              리뷰작성
            </Button>
            <Button
              type="large"
              color="primary1"
              onClick={handleClickAddScheduleButton}
            >
              일정 추가
            </Button>
          </div>
        </div>
      </BottomSheetWrap>
    </>
  );
};

export default MapInfoPage;
