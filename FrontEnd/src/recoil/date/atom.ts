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
