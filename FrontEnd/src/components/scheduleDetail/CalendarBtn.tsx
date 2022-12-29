import React from 'react';
import { BiCalendar } from "react-icons/bi";

interface CalendarBtnProps {
    SetCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CalendarBtn = ({SetCalendarOpen} : CalendarBtnProps) => {

    const onClick = () => {
        SetCalendarOpen(prevState => !prevState)
    }

    return (
        <button type="button" onClick={onClick} className="absolute top-0 left-0 border border-black rounded-full w-30 h-30">
            <BiCalendar className='m-auto'/>
        </button>
    );
};

export default CalendarBtn;