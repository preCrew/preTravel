import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { MdModeEditOutline } from 'react-icons/md';
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
import { currentPlaceAtom } from '@src/recoil/place/atom';

const MySchedule = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { data, refetch: refetchMyPlace } = useGetMyPlaceInSchedule(
    id as string,
  );

  const { setLocationRegion, locationState } = useLocationState();
  const [currentScheduleState, setCurrentScheduleState] =
    useRecoilState(currentScheduleAtom);
  const [currentPlaceState, setCurrentPlaceState] =
    useRecoilState(currentPlaceAtom);
  const selectedDayState = useRecoilValue(selectedDayAtom);
  const calendarIsOpenState = useRecoilValue(calendarIsOpenAtom);

  // const { Map, setNowLocation, drawOverlayOnMap } = useKakaoMap();

  const scheduleDaysArr: number[] = Array(data.schedule.length)
    .fill(null)
    .map((_, i) => i + 1);

  useEffect(() => {
    console.log('데이터추가');
    refetchMyPlace();
  }, [data]);

  // 일차가 바뀔시 현재 날짜 저장
  useEffect(() => {
    setCurrentPlaceState(state => ({
      ...state,
      date: currentScheduleState.schedule[selectedDayState]?.date,
    }));
  }, [selectedDayState]);

  useEffect(() => {
    setLocationRegion(state as string);
    setCurrentScheduleState(data);

    // setSchedulePlaceState()
  }, [currentScheduleState, data]);

  // useEffect(() => {
  //   //데이터 받아온후 지도 그리기
  //   const introLocation = setTimeout(() => {
  //     if (currentScheduleState) {
  //       drawOverlayOnMap(currentScheduleState.schedule[selectedDayState]?.list);
  //     }
  //   }, 1000);
  //   return () => clearTimeout(introLocation);
  // }, [currentScheduleState, currentScheduleState.schedule[selectedDayState]]);

  const onClickBack = () => {};
  const onClickEdit = useCallback(() => {
    navigate('/schedulePlan/edit', { state: data });
  }, []);

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
        <Button
          onClick={onClickEdit}
          name={<MdModeEditOutline />}
          style="absolute right-basic top-20"
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
      {/* {onCallMap()} */}
      {calendarIsOpenState ? (
        <CalendarCon />
      ) : (
        <MyScheduleCon id={id as string} />
      )}
    </>
  );
};

export default MySchedule;
