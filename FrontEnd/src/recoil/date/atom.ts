import { atom } from 'recoil';

export interface IdateAtom {
  allday: number[];
  selectedDayDiff: number;
  selectedDayOn: boolean;
}

const dateAtom = atom({
  key: 'dateAtom', //고유한 키, 아톰 구분
  default: {
    allDay: [0],
    selectedDayDiff: 0,
    selectedDayOn: false,
  }, // 초기값
});

export default dateAtom;
