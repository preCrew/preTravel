import { useRecoilState } from 'recoil';

import { currentScheduleAtom } from '@src/recoil/date/atom';

const useCurrentSchedule = () => {
  const [currentScheduleState, setCurrentScheduleState] =
    useRecoilState(currentScheduleAtom);

  return { currentScheduleState };
};

export default useCurrentSchedule;
