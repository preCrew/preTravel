import { atom } from 'recoil';

export const markerAtom = atom<number | null>({
  key: 'markerAtom', //고유한 키, 아톰 구분
  default: null,
});

export const mapAreaInfoAtom = atom({
  key: 'mapAreaInfoAtom',
  default: {
    memberIdx: '',
    smallLa: '',
    largeLa: '',
    smallLo: '',
    largeLo: '',
  },
});

export const maekerOnMapAtom = atom({
  key: 'maekerOnMapAtom',
  default: false,
});
