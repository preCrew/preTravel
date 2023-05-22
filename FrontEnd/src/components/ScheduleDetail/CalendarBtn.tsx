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
      className="absolute top-0 left-0 bg-white border border-black rounded-full w-30 h-30"
    >
      {calendarIsOpenState ? (
        <IoMdClose className="m-auto" />
      ) : (
        <BiCalendar className="m-auto" />
      )}
    </button>
  );
};

export default CalendarBtn;
