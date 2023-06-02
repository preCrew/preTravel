import { useEffect, useState } from 'react';
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
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentScheduleAtom, selectedDayAtom } from '@src/recoil/date/atom';
import { locationAtom } from '@src/recoil/location/atom';
import BottomSheetWrap from '@src/components/ScheduleDetail/BottomSheet/BottomSheetWrap';
import { modalAtom } from '@src/recoil/modal/atom';
import useSearchPlaceOvelay from '@src/hooks/ovelay/Ovelays/useSearchPlaceOvelay';
import { TCurrentplace, currentPlaceAtom } from '@src/recoil/place/atom';

export interface MapInfoPageProps {}

const MapInfoPage = ({}: MapInfoPageProps) => {
  const navigate = useNavigate();
  const {
    locationState: { selectData },
  } = useLocationState();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchParamsObj = Object.fromEntries(searchParams);

  const [modalOpen, setModalOpen] = useRecoilState(modalAtom);
  const currentScheduleState = useRecoilValue(currentScheduleAtom);
  const [currentPlaceState, setCurrentPlaceState] =
    useRecoilState(currentPlaceAtom);
  const selectDayState = useRecoilValue(selectedDayAtom);
  const [placeAdd, setPlaceAdd] = useState(false);

  const { data: like, refetch: getLikeRefetch } = useGetLike(
    searchParamsObj.name,
    searchParamsObj.latitude,
    searchParamsObj.longitude,
  );
  const { mutate: mutateAddPlace, isLoading: isLoadingAddPlace } =
    useAddPlaceinScehduleQuery();
  const { mutate: addLikeMutation } = useAddLike(
    searchParamsObj.name,
    searchParamsObj.address,
    searchParamsObj.latitude,
    searchParamsObj.longitude,
  );
  const { mutate: deleteLikeMutation } = useDeleteLike(like?.idx ?? '');

  const searchPlaceOvelay = useSearchPlaceOvelay('강남구');

  useEffect(() => {
    setModalOpen(true);
  }, []);

  const handleClickAddScheduleButton = () => {
    const schdule = {
      placeName: searchParamsObj.name,
      address: searchParamsObj.address,
      order: '1',
      la: searchParamsObj.latitude,
      lo: searchParamsObj.longitude,
    };
    //장소 리스트 recoil에 저장
    setCurrentPlaceState((state: TCurrentplace) => ({
      date: currentScheduleState.schedule[selectDayState].date,
      sctIdx: currentScheduleState.idx + '',
      list: [...state.list, schdule],
    }));
    setPlaceAdd(true);
    // mutateAddPlace(currentPlaceState);
  };

  useEffect(() => {
    //장소 추가(요청)
    if (placeAdd) mutateAddPlace(currentPlaceState);
    setPlaceAdd(false);
  }, [currentPlaceState]);

  const handleClickBackButton = () => {
    navigate(-1);
  };

  const handleClickAddReviewButton = () => {
    navigate(`/review/edit`, { state: { topBarName: searchParamsObj.name } });
  };

  const handleClickLikeButton = async () => {
    // TODO: 실제 memberIdx 받아오도록 변경해야함.
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
          css={tw`absolute w-full text-center pointer-events-none text-h4Bold`}
        >
          {searchParamsObj.name}
        </div>
      </TopBar>
      <BottomSheetWrap drag={true}>
        <div css={tw`flex flex-col items-center gap-3 p-2`}>
          <div css={tw`text-h5 `}>{searchParamsObj.address}</div>
          <div css={tw`rounded-full w-30 h-30 flex-with-center bg-gray3`}>
            <IconButton
              type={like ? 'heartFill' : 'heart'}
              onClick={handleClickLikeButton}
            />
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
