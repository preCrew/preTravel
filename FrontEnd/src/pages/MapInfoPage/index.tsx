import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import tw from 'twin.macro';
import useGetLike, { Like } from '@src/hooks/react-query/useGetLike';
import useDeleteLike from '@src/hooks/react-query/useDeleteLike';
import useAddLike from '@src/hooks/react-query/useAddLike';

import IconButton from '@src/components/common/Button/IconButton';
import TopBar from '@src/components/common/TobBar';
import Button from '@src/components/common/Button';
import TopText from '@src/components/common/Text/TopText';
import useLocationState from '@src/hooks/recoil/useLocationState';
// import BottomSheetWrap from '@src/components/scheduleDetail/BottomSheet/BottomSheetWrap';
import useAddPlaceinScehduleQuery from '@src/hooks/react-query/useAddPlaceinScehdule';
import { useRecoilValue } from 'recoil';
import { currentScheduleAtom, selectedDayAtom } from '@src/recoil/date/atom';
import { locationAtom } from '@src/recoil/location/atom';
import BottomSheetWrap from '@src/components/ScheduleDetail/BottomSheet/BottomSheetWrap';

export interface MapInfoPageProps {}

const MapInfoPage = ({}: MapInfoPageProps) => {
  const navigate = useNavigate();
  const {
    locationState: { selectData },
  } = useLocationState();
  const { mutate: mutateAddPlace, isSuccess: isSuccessAddPlace } =
    useAddPlaceinScehduleQuery();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchParamsObj = Object.fromEntries(searchParams);

  const { data: like, refetch: getLikeRefetch } = useGetLike(
    searchParamsObj.name,
    searchParamsObj.latitude,
    searchParamsObj.longitude,
  );
  const currentScheduleState = useRecoilValue(currentScheduleAtom);
  const currentPlaceState = useRecoilValue(locationAtom);
  const selectDayState = useRecoilValue(selectedDayAtom);

  const { mutate: addLikeMutation } = useAddLike(
    searchParamsObj.name,
    searchParamsObj.address,
    searchParamsObj.latitude,
    searchParamsObj.longitude,
  );

  const { mutate: deleteLikeMutation } = useDeleteLike(like?.idx ?? '');

  const { setSelectData } = useLocationState();

  const handleClickAddScheduleButton = () => {
    mutateAddPlace({
      date: currentScheduleState.schedule[selectDayState].date,
      sctIdx: currentScheduleState.idx,
      list: [
        {
          placeName: currentPlaceState.selectData.body,
          address: currentPlaceState.selectData.address,
          order: null,
          la: currentPlaceState.selectData.y,
          lo: currentPlaceState.selectData.x,
        },
      ],
    });
  };

  const handleClickBackButton = () => {
    navigate(-1);
  };

  const handleClickAddReviewButton = () => {
    navigate(`/review/edit`, { state: { topBarName: searchParamsObj.name } });
  };

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
        <div
          css={tw`w-full absolute text-center text-h4Bold pointer-events-none`}
        >
          {selectData.name}
        </div>
      </TopBar>
      <BottomSheetWrap drag={true}>
        <div css={tw`p-2 flex flex-col items-center gap-3`}>
          <div css={tw`text-h5 `}>{selectData.roadAddress}</div>
          <div css={tw`w-30 h-30 flex-with-center bg-gray3 rounded-full`}>
            <IconButton type="heart" />
          </div>
          <div css={tw`flex w-full gap-5 justify-evenly`}>
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
