import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { BiCalendar } from 'react-icons/bi';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IoMdClose } from 'react-icons/io';
import { calendarIsOpenAtom } from '@src/recoil/modal/atom';

interface CalendarBtnProps {}

const CalendarBtn = () => {
  const [calendarIsOpenState, setCalendarIsOpenState] =
    useRecoilState(calendarIsOpenAtom);

  const onClick = () => {
    setCalendarIsOpenState(prev => !prev);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute top-0 left-0 h-30 w-30 rounded-full border border-black bg-white"
    >
      <BiCalendar className="m-auto" />
    </button>
  );
};

export default CalendarBtn;
