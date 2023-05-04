import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import tw from 'twin.macro';
import useLocationState from '@src/hooks/recoil/useLocationState';
import useGetLike, { Like } from '@src/hooks/react-query/useGetLike';
import useDeleteLike from '@src/hooks/react-query/useDeleteLike';
import useAddLike from '@src/hooks/react-query/useAddLike';

import BottomSheetWrap from '@src/components/scheduleDetail/BottomSheet/BottomSheetWrap';
import IconButton from '@src/components/common/Button/IconButton';
import TopBar from '@src/components/common/TobBar';
import Button from '@src/components/common/Button';
import TopText from '@src/components/common/Text/TopText';

interface MapInfoPageProps {}

const MapInfoPage = ({}: MapInfoPageProps) => {
  const navigate = useNavigate();
  const {
    locationState: { selectData },
  } = useLocationState();

  const { data: like, refetch: getLikeRefetch } = useGetLike(
    selectData.name,
    selectData.y,
    selectData.x,
  );
  const { mutate: addLikeMutation } = useAddLike(
    selectData.name,
    selectData.address,
    selectData.y,
    selectData.x,
  );
  const { mutate: deleteLikeMutation } = useDeleteLike();

  useEffect(() => {
    getLikeRefetch();

    // TODO: 리뷰 받아옴, 리뷰 있으면 리뷰 보기, 리뷰 없으면 리뷰 작성.
  }, []);

  const handleClickBackButton = () => {
    navigate(-1);
  };

  const handleClickAddReviewButton = () => {
    navigate('/review/edit');
  };

  const handleClickAddScheduleButton = () => {};

  const handleClickLikeButton = async () => {
    // TODO: memberIdx 받아오도록 변경해야함.
    const tempLikeData: Like = {
      name: selectData.name,
      address: selectData.address,
      idx: selectData.idx,
      latitude: selectData.y,
      longitude: selectData.x,
      memberIdx: '1',
    };

    if (like) deleteLikeMutation();
    else addLikeMutation(tempLikeData);
  };
  return (
    <>
      <TopBar onClickBackButton={handleClickBackButton}>
        <TopText>{selectData.name}</TopText>
      </TopBar>
      <BottomSheetWrap drag={true}>
        <div css={tw`p-2 flex flex-col items-center gap-3`}>
          <div css={tw`text-h5 `}>{selectData.roadAddress}</div>
          <div
            onClick={handleClickLikeButton}
            css={tw`w-30 h-30 flex-with-center bg-gray3 rounded-full`}
          >
            {like ? (
              <IconButton type="heartFill" />
            ) : (
              <IconButton type="heart" />
            )}
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
