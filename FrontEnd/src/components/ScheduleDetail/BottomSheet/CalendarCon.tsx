import Calendar from '@src/components/common/Calendar';
import { useState } from 'react';
import BottomSheetWrap from './BottomSheetWrap';

const CalendarCon = () => {
  const [drag, setDrag] = useState(false);

  return (
    <BottomSheetWrap drag={drag}>
      <Calendar />
    </BottomSheetWrap>
  );
};

export default CalendarCon;
