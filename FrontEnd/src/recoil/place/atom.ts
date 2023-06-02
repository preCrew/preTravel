import { atom } from 'recoil';

export interface TCurrentplace {
  date: string;
  sctIdx: string;
  list: any[];
}

export const currentPlaceAtom = atom<TCurrentplace>({
  key: 'currentPlaceAtom', //고유한 키, 아톰 구분
  default: {
    date: '',
    sctIdx: '',
    list: [],
  },
});
