import React, { useState } from 'react';

import { addDays, format } from 'date-fns';

import { DateRange, DayPicker } from 'react-day-picker';
import ko from 'date-fns/locale/ko';
import 'react-day-picker/dist/style.css';

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
      const firstday = new Date(2022,5,20)
      const [selectedDay, setSelectedDay] = useState<Date | undefined>(firstday);

      return (
        <>
            <style>
                {css}
            </style>
            <DayPicker
                defaultMonth={selectedDay}
                disabled={{
                    after: new Date(2022,5,24),
                    before: new Date(2022,5,20)
                }}
                mode="single" 
                selected={selectedDay}
                onSelect={setSelectedDay}                
                //modifiers={{ booked: firstday }}
                //modifiersStyles={{ booked: {background: 'var(--primary1)',color: 'white'} }}                     
                locale={ko}
            />
        </>
    )
}

export default Calendar;