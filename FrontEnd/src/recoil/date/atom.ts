import { atom } from 'recoil';

interface IcurrentSceduleList {
  date: string;
  list: any[];
}

interface IdateAtom {
  idx: string;
  name: string;
  region: string;
  dateRange: {
    start: string;
    end: string;
  };
  schedule: IcurrentSceduleList[];
}

const currentScheduleAtom = atom<IdateAtom>({
  key: 'currentScheduleAtom',
  default: {
    idx: '',
    name: '',
    region: '',
    dateRange: {
      start: '',
      end: '',
    },
    schedule: [],
  },
});
const selectedDayAtom = atom({
  key: 'selectedDayAtom',
  default: -1,
});

export { selectedDayAtom, currentScheduleAtom };
