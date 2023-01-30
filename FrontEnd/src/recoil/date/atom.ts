import { DateRange } from 'react-day-picker';
import { atom } from 'recoil';

interface IcurrentSceduleList {
  date: string;
  list: [
    {
      id: number;
      placeName: string;
      order: number;
      la: number;
      lo: number;
    },
  ];
}
interface IdateAtom {
  id: number;
  title: string;
  dateRange: string | number[];
  schedule: IcurrentSceduleList[];
}

// const dateAtom = atom({
//   key: 'dateAtom', //고유한 키, 아톰 구분
//   default: {
//     allDay: [0],
//     currentSchedule: {
//       date: {
//         date: '',
//         list: [],
//       },
//       list: [],
//     },
//     selectedDayDiff: 0,
//     selectedDay: 0,
//     selectedDayOn: false,
//   }, // 초기값
// });

const currentScheduleAtom = atom<IdateAtom>({
  key: 'currentScheduleAtom',
  default: {
    id: 1,
    title: '',
    dateRange: [],
    schedule: [],
  },
});
const selectedDayAtom = atom({
  key: 'selectedDayAtom',
  default: 0,
});

export { selectedDayAtom, currentScheduleAtom };
