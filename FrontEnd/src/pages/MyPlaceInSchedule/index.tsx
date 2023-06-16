import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { MdModeEditOutline } from 'react-icons/md';
// import useKakaoMap from '@src/components/common/Map/useKakaoMap';
import TabSlide from '@src/components/common/TabSlide/TabSlide';
import Button from '@src/components/ScheduleDetail/BottomSheet/Button';
import CalendarCon from '@src/components/ScheduleDetail/BottomSheet/CalendarCon';

import CalendarBtn from '@src/components/ScheduleDetail/CalendarBtn';
import Title from '@src/components/ScheduleDetail/Title';

import useGetMyPlaceInSchedule from '@src/hooks/react-query/useGetMyPlaceInSchedule';

import useLocationState from '@src/hooks/recoil/useLocationState';
import { currentScheduleAtom, selectedDayAtom } from '@src/recoil/date/atom';
import { calendarIsOpenAtom } from '@src/recoil/modal/atom';
import { currentPlaceAtom } from '@src/recoil/place/atom';
import MyScheduleCon from '@src/components/ScheduleDetail/BottomSheet/MyScheduleCon';
import useMap from '@src/hooks/map/useMap';
import Map from '@src/components/common/Map';
import OrderMarkers from '@src/components/ScheduleDetail/PlaceMarker/OrderMarkers';

const MySchedule = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { initializeMap, mapLoad, getCenterMap } = useMap();
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

  const scheduleDaysArr: number[] = Array(data.schedule.length)
    .fill(null)
    .map((_, i) => i + 1);

  useEffect(() => {
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
    //지역 저장
    setLocationRegion(state as string);
    //현재 일정 저장
    setCurrentScheduleState(data);
  }, [currentScheduleState, data]);

  const onLoadMap = useCallback((map: any) => {
    initializeMap(map);
  }, []);

  const onClickBack = useCallback(() => {
    navigate('/mySchedule');
  }, []);

  const onClickEdit = useCallback(() => {
    navigate('/schedulePlan/edit', { state: data });
  }, []);

  useEffect(() => {
    const currentList = currentScheduleState.schedule[selectedDayState]?.list;

    const allLatitude =
      currentPlaceState &&
      currentPlaceState.list.reduce((acc: number, curr: any) => {
        return acc + curr.la * 1;
      }, 0) / currentList?.length;

    const allLongitude =
      currentList &&
      currentPlaceState.list.reduce((acc: number, curr: any) => {
        return acc + curr.lo * 1;
      }, 0) / currentList?.length;

    if (!allLatitude) return;
    if (mapLoad) getCenterMap([allLatitude + '', allLongitude + '']);
  }, [mapLoad]);

  return (
    <>
      <header className="fixed left-0 right-0 z-10 top-5">
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
      <Map
        onLoad={onLoadMap}
        // initialCetner={
        //   currentPlaceState.list.length ? [allLatitude, allLongitude] : 0
        // }
      />
      <OrderMarkers
        data={currentPlaceState}
        mapLoad={mapLoad}
      />
      {/*/////====지도====*/}
      {calendarIsOpenState ? (
        <CalendarCon />
      ) : (
        <MyScheduleCon id={id as string} />
      )}
    </>
  );
};

export default MySchedule;
