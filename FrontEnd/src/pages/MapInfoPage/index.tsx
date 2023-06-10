import { useEffect } from 'react';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import tw from 'twin.macro';

import { currentScheduleAtom, selectedDayAtom } from '@src/recoil/date/atom';
import { locationAtom } from '@src/recoil/location/atom';
import { modalAtom } from '@src/recoil/modal/atom';

import useAddPlaceinScehduleQuery from '@src/hooks/react-query/useAddPlaceinScehdule';
import useGetLike, { Like } from '@src/hooks/react-query/useGetLike';
import useDeleteLike from '@src/hooks/react-query/useDeleteLike';
import useAddLike from '@src/hooks/react-query/useAddLike';

import BottomSheetWrap from '@src/components/ScheduleDetail/BottomSheet/BottomSheetWrap';
import IconButton from '@src/components/common/Button/IconButton';
import Button from '@src/components/common/Button';
import TopBar from '@src/components/common/TobBar';
import useGetUserVisitedPlace from '@src/hooks/react-query/useGetUserVisitedPlace';
import useGetReview, { IReview } from '@src/hooks/react-query/useGetReview';
import useGetReviewByName from '@src/hooks/react-query/useGetReviewByName';

export interface MapInfoPageProps {}

const MapInfoPage = ({}: MapInfoPageProps) => {
  const navigate = useNavigate();
  const { mutate: mutateAddPlace } = useAddPlaceinScehduleQuery();

  const [modalOpen, setModalOpen] = useRecoilState(modalAtom);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchParamsObj = Object.fromEntries(searchParams);

  const { data: like } = useGetLike(
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

  const { data: isVisitedPlace } = useGetUserVisitedPlace(
    searchParamsObj.name,
    searchParamsObj.latitude,
    searchParamsObj.longitude,
  );

  const { mutate: deleteLikeMutation } = useDeleteLike(like?.idx ?? '');

  const { data: reviewData } = useGetReviewByName(
    searchParamsObj.name,
    searchParamsObj.latitude,
    searchParamsObj.longitude,
  );

  useEffect(() => {
    setModalOpen(true);
  }, []);

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
    // 리뷰가 존재한다면 리뷰 보기로 이동
    if (reviewData) {
      const searchParam = createSearchParams({
        name: searchParamsObj.name,
        latitude: searchParamsObj.latitude,
        longitude: searchParamsObj.longitude,
      });

      navigate({
        pathname: '/review',
        search: `?${searchParam}`,
      });
    }
    // 리뷰가 존재하지 않는다면 리뷰 작성으로 이동
    else {
      navigate(`/review/edit`, {
        state: {
          name: searchParamsObj.name,
          address: searchParamsObj.address,
          latitude: searchParamsObj.latitude,
          longitude: searchParamsObj.longitude,
        },
      });
    }
  };

  const handleClickisabledReviewButton = () => {
    alert(
      '현재 장소에 방문한적이 없었습니다. \n일정에 추가후 리뷰를 작성해주세요',
    );
  };

  const handleClickLikeButton = async () => {
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
          {searchParamsObj.name}
        </div>
      </TopBar>
      <BottomSheetWrap drag={true}>
        <div css={tw`p-2 flex flex-col items-center gap-3`}>
          <div css={tw`text-h5 `}>{searchParamsObj.address}</div>
          <div css={tw`w-30 h-30 flex-with-center bg-gray3 rounded-full`}>
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
              disabled={false}
              onClickDisabled={handleClickisabledReviewButton}
            >
              {true ? '리뷰 작성' : '리뷰 보기'}
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
