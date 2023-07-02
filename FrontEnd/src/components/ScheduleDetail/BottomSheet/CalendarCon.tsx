import React, { useState } from 'react';
import Calendar from '@src/components/common/Calendar';
import { useRecoilState } from 'recoil';
import { MdClose } from 'react-icons/md';

import BottomSheetWrap from './BottomSheetWrap';
import { calendarIsOpenAtom } from '@src/recoil/modal/atom';

const CalendarCon = () => {
  const [drag, setDrag] = useState(false);
  const [calendarIsOpenState, setCalendarIsOpenState] =
    useRecoilState(calendarIsOpenAtom);

  const onClick = () => {
    setCalendarIsOpenState(prev => !prev);
  };

  return (
    <BottomSheetWrap
      drag={drag}
      snapIdx={0}
    >
      <MdClose
        className="absolute top-0 right-0 m-auto h-25 w-25 bg-white"
        onClick={onClick}
      />
      <Calendar />
    </BottomSheetWrap>
  );
};

export default CalendarCon;
