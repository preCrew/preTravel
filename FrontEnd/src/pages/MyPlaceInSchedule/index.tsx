import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

// import useKakaoMap from '@src/components/common/Map/useKakaoMap';
import TabSlide from '@src/components/common/TabSlide/TabSlide';
import Button from '@src/components/ScheduleDetail/BottomSheet/Button';
import CalendarCon from '@src/components/ScheduleDetail/BottomSheet/CalendarCon';
import MyScheduleCon from '@src/components/ScheduleDetail/BottomSheet/MyScheduleCon';
import CalendarBtn from '@src/components/ScheduleDetail/CalendarBtn';
import Title from '@src/components/ScheduleDetail/Title';

import useGetMyPlaceInSchedule from '@src/hooks/react-query/useGetMyPlaceInSchedule';

import useLocationState from '@src/hooks/recoil/useLocationState';
import { currentScheduleAtom, selectedDayAtom } from '@src/recoil/date/atom';
import { calendarIsOpenAtom } from '@src/recoil/modal/atom';

const MySchedule = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { data } = useGetMyPlaceInSchedule(id as string);

  const { setLocationRegion, locationState } = useLocationState();
  const [currentScheduleState, setCurrentScheduleState] =
    useRecoilState(currentScheduleAtom);
  const selectedDayState = useRecoilValue(selectedDayAtom);
  const calendarIsOpenState = useRecoilValue(calendarIsOpenAtom);

  // const { Map, setNowLocation, drawOverlayOnMap } = useKakaoMap();

  const scheduleDaysArr: number[] = Array(data.schedule.length)
    .fill(null)
    .map((_, i) => i + 1);

  useEffect(() => {
    setLocationRegion(state as string);

    setCurrentScheduleState(data);

    // setSchedulePlaceState()
  }, [currentScheduleState]);

  // useEffect(() => {
  //   //데이터 받아온후 지도 그리기
  //   const introLocation = setTimeout(() => {
  //     if (currentScheduleState) {
  //       drawOverlayOnMap(currentScheduleState.schedule[selectedDayState]?.list);
  //     }
  //   }, 1000);
  //   return () => clearTimeout(introLocation);
  // }, [currentScheduleState, currentScheduleState.schedule[selectedDayState]]);

  const onClickBack = () => {
    console.log(1);
  };

  // const onCallMap = useCallback(() => {
  //   return <Map />;
  // }, [currentScheduleState]);

  return (
    <>
      <header className="fixed left-0 right-0 top-5 z-10">
        <Title title={currentScheduleState.name} />
        <Button
          onClick={onClickBack}
          name="나가기"
          style="absolute right-basic top-0"
        />
        <div className="relative ml-basic mt-4">
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
      {/* {onCallMap()} */}
      {calendarIsOpenState ? <CalendarCon /> : <MyScheduleCon />}
    </>
  );
};

export default MySchedule;
