import { atom } from 'recoil';

export const mapAtom = atom<any>({
  key: 'map', //고유한 키, 아톰 구분
  default: null,
});
