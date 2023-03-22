import { atom } from 'recoil';

export const categoryAtom = atom<number | null>({
  key: 'categoryAtom', //고유한 키, 아톰 구분
  default: null,
});
