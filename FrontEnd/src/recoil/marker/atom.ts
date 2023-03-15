import { atom } from 'recoil';

export const markerAtom = atom<number | null>({
  key: 'markerAtom', //고유한 키, 아톰 구분
  default: null,
});
