import { atom } from 'recoil';

export const scheduleFileAtom = atom({
  key: 'scheduleFile', //고유한 키, 아톰 구분
  default: {
    idx: '',
    dir: '',
  },
});
