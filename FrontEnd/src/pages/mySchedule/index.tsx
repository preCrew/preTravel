<<<<<<< HEAD
import useKakaoMap from '@src/components/common/Map/useKakaoMap';
import TabSlide from '@src/components/common/TabSlide/TabSlide';
import Button from '@src/components/scheduleDetail/BottomSheet/Button';
import CalendarCon from '@src/components/scheduleDetail/BottomSheet/CalendarCon';
import MyScheduleCon from '@src/components/scheduleDetail/BottomSheet/MyScheduleCon';
import CalendarBtn from '@src/components/scheduleDetail/CalendarBtn';
import Title from '@src/components/scheduleDetail/Title';
import { currentScheduleAtom, selectedDayAtom } from '@src/recoil/date/atom';
import { calendarIsOpenAtom } from '@src/recoil/modal/atom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
// import Title from '@src/components/ScheduleDetail/Title';

async function fetchPost(postId: number) {
  try {
    const response = await axios.get(`http://localhost:3001/posts/${postId}`);
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

const MySchedule = () => {
  const { id } = useParams();
  const postId = (id as unknown as number) * 1;
  const { data, isLoading, error, isError } = useQuery(['posts', postId], () =>
    fetchPost(postId),
  );
  const [currentScheduleState, setCurrentScheduleState] =
    useRecoilState(currentScheduleAtom);
  const selectedDayState = useRecoilValue(selectedDayAtom);
  const { Map, setNowLocation, drawOverlayOnMap } = useKakaoMap();
  const calendarIsOpenState = useRecoilValue(calendarIsOpenAtom);
  const scheduleDaysArr: number[] = Array(currentScheduleState.schedule.length)
    .fill(null)
    .map((_, i) => i + 1);

  useEffect(() => {
    setCurrentScheduleState(data);
    //데이터 받아온후 지도 그리기
    const introLocation = setTimeout(() => {
      if (currentScheduleState) {
        //setNowLocation({ lat: 33.505723800807067, lng: 126.491236832635933 });
        drawOverlayOnMap(currentScheduleState.schedule[selectedDayState]?.list);
      }
    }, 0);
    return () => clearTimeout(introLocation);
  }, [
    data,
    currentScheduleState,
    currentScheduleState.schedule[selectedDayState],
  ]);

  const onClickBack = () => {
    console.log(1);
  };

  const onCallMap = useCallback(() => {
    return <Map />;
  }, [currentScheduleState]);

  return (
    <>
      <header className="fixed left-0 right-0 top-5 z-10">
        <Title title={currentScheduleState.title} />
        <Button
          onClick={onClickBack}
          name="나가기"
          style="absolute right-basic top-0"
        />
        <div className="relative mt-4 ml-basic">
          <CalendarBtn />
          {!calendarIsOpenState && (
            <TabSlide
              data={scheduleDaysArr}
              category="일차별"
            />
          )}
        </div>
      </header>
      {/*====지도====*/}
      {onCallMap()}
      {calendarIsOpenState ? <CalendarCon /> : <MyScheduleCon />}
=======
import { useNavigate } from 'react-router-dom';
import { Suspense, useState } from 'react';
import { useRecoilValue } from 'recoil';
import tw from 'twin.macro';

import filteredCardListSelector from '@src/recoil/cardList/selector';
import useCardListState from '@src/hooks/recoil/useCardListState';

import useMyScheduleDeleteQuery from '@src/hooks/react-query/useDeleteMyScheduleQuery';

import Button from '@src/components/common/Button';
import MyScheduleCardList from '@src/components/MyScedule/MyScheduleCardList';
import CancelBtn from '@src/components/MyScedule/CancelBtn';
import { SkeletonMyScheduleCard } from '@src/components/MyScedule/MyScheduleCard';
import IconBox from '@src/components/MyScedule/IconBox';
import mySchedule from './style';
import SelectNumberBox from '@src/components/MyScedule/SelectNumberBox';

const MySchedule2 = () => {
  const navigate = useNavigate();
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const { clearCardState } = useCardListState();
  const filterdSelectedListState = useRecoilValue(filteredCardListSelector);

  const { mutate: deleteScheduleQuery } = useMyScheduleDeleteQuery();

  const handleClickBackButton = () => {
    navigate(-1);
  };
  const handleClickAddButton = () => {
    navigate('/search');
  };
  const handleClickTopRemoveButton = () => {
    setIsDeleteMode(true);
  };
  const handleClickBottomRemoveButton = () => {
    setIsDeleteMode(false);
    deleteScheduleQuery();
    clearCardState();
  };
  const handleClickCancelButton = () => {
    setIsDeleteMode(false);
    clearCardState();
  };

  return (
    <>
      <div className={mySchedule.childrenBox}>
        <div className={mySchedule.title}>내 일정</div>
        <div className={mySchedule.buttonBox}>
          {isDeleteMode ? (
            <div className="flex">
              <CancelBtn onClick={handleClickCancelButton} />
              <SelectNumberBox />
            </div>
          ) : (
            <IconBox
              onClickAddButton={handleClickAddButton}
              onClickRemoveButton={handleClickTopRemoveButton}
            />
          )}
        </div>
      </div>

      <div css={tw`overflow-y-scroll`}>
        <Suspense fallback={<SkeletonMyScheduleCard />}>
          <MyScheduleCardList deleteMode={isDeleteMode} />
        </Suspense>
        {filterdSelectedListState > 0 && (
          <Button
            type="large"
            color="primary1"
            onClick={handleClickBottomRemoveButton}
            css={tw`absolute bottom-2 `}
          >
            삭제하기
          </Button>
        )}
      </div>
>>>>>>> dev
    </>
  );
};

<<<<<<< HEAD
export default MySchedule;
=======
export default MySchedule2;
>>>>>>> dev
