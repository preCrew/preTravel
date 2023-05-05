import { atom } from 'recoil';

export const scheduleAtom = atom({
  key: 'scheduleAtom', //고유한 키, 아톰 구분
  default: {
    idx: '',
    memberIdx: '',
    name: '',
    startDate: '',
    endDate: '',
    createDate: '',
    modifyDate: '',
    file: [],
  },
});
