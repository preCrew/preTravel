import React, { useEffect, useState } from 'react';

import { addDays, format } from 'date-fns';

import { DayClickEventHandler, DateRange, DayPicker } from 'react-day-picker';
import ko from 'date-fns/locale/ko';
import 'react-day-picker/dist/style.css';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { calendarIsOpenAtom, modalAtom } from '@src/recoil/modal/atom';
import { currentScheduleAtom, selectedDayAtom } from '@src/recoil/date/atom';

const css = `
    .rdp-button:hover:not([disabled]):not(.rdp-day_selected),
    .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover{
        background-color: var(--primary1) !important;
        color: white;
    }
`;
interface CalendarProps {}

const Calendar = () => {
  const currentScheduleState = useRecoilValue(currentScheduleAtom);
  const [selectedDayState, setSelectedDayState] =
    useRecoilState(selectedDayAtom);

  const [selectedDay, setSelectedDay] = useState<any>(
    new Date(currentScheduleState.dateRange.start),
  );
  const [calendarIsOpenState, setCalendarIsOpenState] =
    useRecoilState(calendarIsOpenAtom);

  const getDateDiff = (date1: any, date2: Date) => {
    const startDay = new Date(date1);

    let selectedDayYear = date2.getFullYear();
    let selectedDayMonth: any = date2.getMonth() + 1;
    let selectedDate = date2.getDate();

    selectedDayMonth =
      selectedDayMonth >= 10 ? selectedDayMonth : '0' + selectedDayMonth;
    const onSelectedDay = new Date(
      selectedDayYear + '-' + selectedDayMonth + '-' + selectedDate,
    );

    const diffDate = startDay.getTime() - onSelectedDay.getTime();
    return Math.abs(diffDate / (1000 * 60 * 60 * 24));
  };

  const handleDayClick: DayClickEventHandler = day => {
    setCalendarIsOpenState(false);
    setSelectedDayState(getDateDiff(currentScheduleState.dateRange.start, day));
  };

  return (
    <>
      <style>{css}</style>
      <DayPicker
        defaultMonth={selectedDay}
        disabled={{
          after: new Date(currentScheduleState.dateRange.end), //마지막날짜
          before: new Date(currentScheduleState.dateRange.start), //시작날짜
        }}
        mode="single"
        selected={selectedDay}
        onSelect={setSelectedDay}
        onDayClick={handleDayClick}
        //modifiers={{ booked: firstday }}
        //modifiersStyles={{ booked: {background: 'var(--primary1)',color: 'white'} }}
        locale={ko}
      />
    </>
  );
};

export default Calendar;
