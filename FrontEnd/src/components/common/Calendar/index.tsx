import React, { useEffect, useState } from 'react';

import { addDays, format } from 'date-fns';

import { DayClickEventHandler, DateRange, DayPicker } from 'react-day-picker';
import ko from 'date-fns/locale/ko';
import 'react-day-picker/dist/style.css';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import dateAtom from '@src/recoil/date/atom';
import { modalAtom } from '@src/recoil/modal/atom';

//여행날짜 1일차
const pastMonth = new Date(2022, 5, 15);

const css = `
    .rdp-button:hover:not([disabled]):not(.rdp-day_selected),
    .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover{
        background-color: var(--primary1) !important;
        color: white;
    }
`;

const Calendar = () => {
  //1일차 날짜
  const firstDay = new Date(2022, 5, 20);
  const endDay = new Date(2022, 5, 24);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(firstDay);
  const diffDay = useRecoilValue(dateAtom);
  const [dateVlaue, setDateValue] = useRecoilState(dateAtom);
  const setOpen = useSetRecoilState(modalAtom);

  useEffect(() => {
    //console.log(+endDay - +firstDay, diffDay);
  }, [selectedDay]);

  const handleDayClick: DayClickEventHandler = day => {
    setDateValue(prevValue => ({
      ...prevValue,
      selectedDayDiff:
        (day.getTime() - firstDay.getTime()) / 1000 / 60 / 60 / 24,
      selectedDayOn: false,
    }));
    //setOpen(false);
    //(day.getTime() - firstDay.getTime()) / 1000 / 60 / 60 / 24;
  };

  return (
    <>
      <style>{css}</style>
      <DayPicker
        defaultMonth={selectedDay}
        disabled={{
          after: new Date(2022, 5, 24),
          before: new Date(2022, 5, 20),
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
