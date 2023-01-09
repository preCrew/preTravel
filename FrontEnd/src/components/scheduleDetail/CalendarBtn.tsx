import dateAtom from '@src/recoil/date/atom';
import React, { useState } from 'react';
import { BiCalendar } from 'react-icons/bi';
import { useSetRecoilState } from 'recoil';

interface CalendarBtnProps {
  //SetCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CalendarBtn = ({}: CalendarBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const setCalendarOpen = useSetRecoilState(dateAtom);

  const onClick = () => {
    setIsOpen(prevState => !prevState);
    setCalendarOpen(prevState => ({
      ...prevState,
      selectedDayOn: true,
    }));
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute top-0 left-0 border border-black rounded-full w-30 h-30"
    >
      <BiCalendar className="m-auto" />
    </button>
  );
};

export default CalendarBtn;
