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
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

async function fetchPost(postId: number) {
  const response = await fetch(`http://localhost:8000/posts/${postId}`);
  return response.json();
}

const MySchedule = () => {
  const { id } = useParams();
  const postId = (id as unknown as number) * 1;
  const { data, isLoading, error, isError } = useQuery(['posts', postId], () =>
    fetchPost(postId),
  );
  const [isOpen, setIsOpen] = useState(false);
  const [currentScheduleState, setCurrentScheduleState] =
    useRecoilState(currentScheduleAtom);
  const selectedDayState = useRecoilValue(selectedDayAtom);
  const { Map, setNowLocation, drawOverlayOnMap } = useKakaoMap();
  const calendarIsOpenState = useRecoilValue(calendarIsOpenAtom);

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
      <header className="fixed left-0 right-0 z-10 top-5">
        <Title title={currentScheduleState.title} />
        <Button
          onClick={onClickBack}
          name="나가기"
          style="absolute right-basic top-0"
        />
        <div className="relative mt-4 ml-basic">
          <CalendarBtn />
          {!calendarIsOpenState && <TabSlide />}
        </div>
      </header>
      {/*====지도====*/}
      {onCallMap()}
      {calendarIsOpenState ? <CalendarCon /> : <MyScheduleCon />}
    </>
  );
};

export default MySchedule;
