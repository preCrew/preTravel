import { useCallback, useEffect, useState } from 'react';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import tw from 'twin.macro';

import { currentScheduleAtom, selectedDayAtom } from '@src/recoil/date/atom';
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
import useGetReviewByName from '@src/hooks/react-query/useGetReviewByName';
import { TCurrentplace, currentPlaceAtom } from '@src/recoil/place/atom';
import useLocationState from '@src/hooks/recoil/useLocationState';
import Map from '@src/components/common/Map';
import useMap from '@src/hooks/map/useMap';

export interface MapInfoPageProps {}

const MapInfoPage = ({}: MapInfoPageProps) => {
  const navigate = useNavigate();
  const {
    locationState: { selectData },
  } = useLocationState();
  const { initializeMap, mapLoad, getCenterMap, setLevelMap } = useMap();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchParamsObj = Object.fromEntries(searchParams);

  const [modalOpen, setModalOpen] = useRecoilState(modalAtom);
  const currentScheduleState = useRecoilValue(currentScheduleAtom);
  const [currentPlaceState, setCurrentPlaceState] =
    useRecoilState(currentPlaceAtom);
  const selectDayState = useRecoilValue(selectedDayAtom);
  const [placeAdd, setPlaceAdd] = useState(false);

  const { mutate: mutateAddPlace } = useAddPlaceinScehduleQuery();
  const { data: like, refetch: getLikeRefetch } = useGetLike(
    searchParamsObj.name,
    searchParamsObj.latitude,
    searchParamsObj.longitude,
  );
  // const { mutate: mutateAddPlace, isLoading: isLoadingAddPlace } =
  //   useAddPlaceinScehduleQuery();
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

  const onLoadMap = useCallback((map: any) => {
    initializeMap(map);
  }, []);

  useEffect(() => {
    setModalOpen(true);
  }, []);

  useEffect(() => {
    if (mapLoad) {
      getCenterMap([searchParamsObj.latitude, searchParamsObj.longitude]);
      setLevelMap();
    }
  }, [mapLoad]);

  const handleClickAddScheduleButton = () => {
    const schdule = {
      placeName: searchParamsObj.name,
      address: searchParamsObj.address,
      order: '1',
      la: searchParamsObj.latitude,
      lo: searchParamsObj.longitude,
    };
    console.log(selectDayState);
    // order 순차적으로 변경
    const copyPlaceList = [...currentPlaceState.list, schdule];
    const newPlaceList = copyPlaceList.map((place, idx) => ({
      ...place,
      order: (idx + 1).toString(),
    }));

    //장소 리스트 recoil에 선 저장
    setCurrentPlaceState((state: TCurrentplace) => ({
      date: currentScheduleState.schedule[selectDayState].date,
      sctIdx: currentScheduleState.idx + '',
      list: newPlaceList,
    }));
    setPlaceAdd(true);
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
          css={tw`absolute w-full text-center pointer-events-none text-h4Bold`}
        >
          {searchParamsObj.name}
        </div>
      </TopBar>
      <Map
        onLoad={onLoadMap}
        // initialCetner={
        //   currentPlaceState.list.length ? [allLatitude, allLongitude] : 0
        // }
      />
      <BottomSheetWrap
        drag={true}
        snapIdx={2}
      >
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
              disabled={isVisitedPlace}
              onClickDisabled={handleClickisabledReviewButton}
            >
              {isVisitedPlace ? '리뷰 보기' : '리뷰 작성'}
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
