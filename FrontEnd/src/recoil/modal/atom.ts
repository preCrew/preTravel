import { atom } from 'recoil';

export const modalAtom = atom({
  key: 'modalAtom', //고유한 키, 아톰 구분
  default: false,
});

export const modalDragAtom = atom({
  key: 'modalDragAtom', //고유한 키, 아톰 구분
  default: true,
});
