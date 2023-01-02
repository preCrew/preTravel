import BottomSheet from "@src/components/BottomSheet";
import Calendar from "@src/components/common/Calendar";
import React, { useState } from "react";import BottomSheetWrap from "./BottomSheetWrap";
;
import Button from "./Button";
import MyScheduleList from "./MyScheduleList";

const CalendarCon = () => {
    const [drag,setDrag] = useState(false)
    
    return (
        <BottomSheetWrap drag={drag}>       
            <Calendar/>
        </BottomSheetWrap> 
    );
};

export default CalendarCon;