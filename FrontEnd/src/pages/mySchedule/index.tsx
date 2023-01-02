import TabSlide from "@src/components/common/TabSlide/TabSlide";
import Button from "@src/components/scheduleDetail/BottomSheet/Button";
import CalendarCon from "@src/components/scheduleDetail/BottomSheet/CalendarCon";
import MyScheduleCon from "@src/components/scheduleDetail/BottomSheet/MyScheduleCon";
import CalendarBtn from "@src/components/scheduleDetail/CalendarBtn";
import Title from "@src/components/scheduleDetail/Title";
import { useEffect, useState } from "react";


const MySchedule = () => {
    const [calendarOpen,SetCalendarOpen] = useState(false);

    const onClickBack = () => {
        console.log(1)
    }  

    return (
        <>
            <header className="fixed left-0 right-0 top-5">
                <Title/>
                <Button onClick={onClickBack} name="나가기" style="absolute right-basic top-0"/> 
                <div className="relative ml-basic">
                    <CalendarBtn SetCalendarOpen={SetCalendarOpen}/>  
                    <TabSlide/>
                    {/* {calendarOpen && }                             */}
                </div>
            </header>
            {calendarOpen ? <CalendarCon /> : <MyScheduleCon/>}

        </>
    )
}

export default MySchedule;