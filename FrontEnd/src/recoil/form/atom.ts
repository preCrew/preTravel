import { atom } from 'recoil';

export const fieldAtom = atom({
  key: 'fieldAtom', //고유한 키, 아톰 구분
  default: false,
});
