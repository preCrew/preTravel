import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import { useRecoilState, useRecoilValue } from 'recoil';

import BottomSheetWrap from '@src/components/scheduleDetail/BottomSheet/BottomSheetWrap';
import IconButton from '@src/components/common/Button/IconButton';
import TopBar from '@src/components/common/TobBar';
import Button from '@src/components/common/Button';
import useLocationState from '@src/hooks/recoil/useLocationState';
import useAddPlaceinScehduleQuery from '@src/hooks/react-query/useAddPlaceinScehdule';
import { locationAtom } from '@src/recoil/location/atom';
import { currentScheduleAtom, selectedDayAtom } from '@src/recoil/date/atom';

interface MapInfoPageProps {}

const MapInfoPage = ({}: MapInfoPageProps) => {
  const navigate = useNavigate();
  const { mutate: mutateAddPlace, isLoading: isLoadingAddPlace } =
    useAddPlaceinScehduleQuery();

  const {
    locationState: { selectData },
  } = useLocationState();

  const [currentScheduleState, setCurrentScheduleState] =
    useRecoilState(currentScheduleAtom);
  const currentPlaceState = useRecoilValue(locationAtom);
  const selectedDayState = useRecoilValue(selectedDayAtom);

  const handleClickBackButton = () => {
    navigate(-1);
  };

  const handleClickAddReviewButton = () => {
    navigate('/review/edit');
  };

  const handleClickAddScheduleButton = () => {
    console.log(currentScheduleState.schedule[selectedDayState].list.length);
    //일정이 없는경우
    if (!currentScheduleState.schedule[selectedDayState].list.length) {
      const newPlace = {
        date: currentScheduleState.schedule[selectedDayState].date,
        sctIdx: currentScheduleState.idx + '',
        list: [
          {
            placeName: currentPlaceState.selectData.body,
            address: currentPlaceState.selectData.address,
            order: '1',
            la: currentPlaceState.selectData.y,
            lo: currentPlaceState.selectData.x,
          },
        ],
      };
      console.log(newPlace);
      mutateAddPlace(newPlace);
    } else {
      // 일정이 1개 이상인경우(현재 일정에 가지고 있는 플레이스 리스트들과 안꺼번에 같이 보내줘야함.)
      const currentPlaceData = currentScheduleState.schedule.filter(
        val =>
          val.date === currentScheduleState.schedule[selectedDayState].date,
      )[0];

      const selectedPlace = {
        placeName: currentPlaceState.selectData.body,
        address: currentPlaceState.selectData.address,
        order: '2',
        la: currentPlaceState.selectData.y,
        lo: currentPlaceState.selectData.x,
      };

      const newList = [...currentPlaceData.list];
      newList.push(selectedPlace);

      const newPlace = {
        date: currentScheduleState.schedule[selectedDayState].date,
        sctIdx: currentScheduleState.idx + '',
        list: newList,
      };

      console.log(newPlace);
      mutateAddPlace(newPlace);
    }

    // 현
    //

    //if (!isLoadingAddPlace) navigate(`/mySchedule/${currentScheduleState.idx}`);
  };

  return (
    <>
      <TopBar onClickBackButton={handleClickBackButton}>
        <div
          css={tw`absolute w-full text-center pointer-events-none text-h4Bold`}
        >
          {selectData.name}
        </div>
      </TopBar>
      <BottomSheetWrap drag={true}>
        <div css={tw`flex flex-col items-center gap-3 p-2`}>
          <div css={tw`text-h5 `}>{selectData.roadAddress}</div>
          <div css={tw`rounded-full w-30 h-30 flex-with-center bg-gray3`}>
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
