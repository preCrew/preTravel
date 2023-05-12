import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import tw from 'twin.macro';
import useGetLike, { Like } from '@src/hooks/react-query/useGetLike';
import useDeleteLike from '@src/hooks/react-query/useDeleteLike';
import useAddLike from '@src/hooks/react-query/useAddLike';

import BottomSheetWrap from '@src/components/scheduleDetail/BottomSheet/BottomSheetWrap';
import IconButton from '@src/components/common/Button/IconButton';
import TopBar from '@src/components/common/TobBar';
import Button from '@src/components/common/Button';
import TopText from '@src/components/common/Text/TopText';
import useLocationState from '@src/hooks/recoil/useLocationState';

export interface MapInfoPageProps {}

const MapInfoPage = ({}: MapInfoPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchParamsObj = Object.fromEntries(searchParams);

  const { data: like, refetch: getLikeRefetch } = useGetLike(
    searchParamsObj.name,
    searchParamsObj.latitude,
    searchParamsObj.longitude,
  );

  const { mutate: addLikeMutation } = useAddLike(
    searchParamsObj.name,
    searchParamsObj.address,
    searchParamsObj.latitude,
    searchParamsObj.longitude,
  );

  const { mutate: deleteLikeMutation } = useDeleteLike(like?.idx ?? '');

  const { setSelectData } = useLocationState();

  useEffect(() => {
    // 만약 주소로 들어왔다면 selectData를 채워줘야함.
    setSelectData({
      name: searchParamsObj.name,
      address: searchParamsObj.address,
      y: searchParamsObj.latitude,
      x: searchParamsObj.longitude,
    });
    getLikeRefetch();
    // TODO: 리뷰 받아옴, 리뷰 있으면 리뷰 보기, 리뷰 없으면 리뷰 작성.
  }, []);

  const handleClickBackButton = () => {
    navigate(-1);
  };

  const handleClickAddReviewButton = () => {
    navigate(`/review/edit`, { state: { topBarName: searchParamsObj.name } });
  };

  const handleClickAddScheduleButton = () => {};

  const handleClickLikeButton = async () => {
    // TODO: memberIdx 받아오도록 변경해야함.
    const tempLikeData: Like = {
      name: searchParamsObj.name,
      address: searchParamsObj.address,
      idx: '0',
      latitude: searchParamsObj.latitude,
      longitude: searchParamsObj.longitude,
      memberIdx: '1',
    };

    if (like) {
      deleteLikeMutation();
    } else {
      addLikeMutation(tempLikeData);
    }
  };
  return (
    <>
      <TopBar onClickBackButton={handleClickBackButton}>
        <TopText>{searchParamsObj.name}</TopText>
      </TopBar>
      <BottomSheetWrap drag={true}>
        <div css={tw`p-2 flex flex-col items-center gap-3`}>
          <div css={tw`text-h5 `}>{searchParamsObj.address}</div>
          <div
            onClick={handleClickLikeButton}
            css={tw`w-30 h-30 flex-with-center bg-gray3 rounded-full`}
          >
            {like || '' ? (
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
