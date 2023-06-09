import { atom } from 'recoil';

export type Tplace = {
  placeName: string;
  address: string;
  order: string;
  la: string;
  lo: string;
};
export interface TCurrentplace {
  date: string;
  sctIdx: string;
  list: Tplace[];
}

export const currentPlaceAtom = atom<TCurrentplace>({
  key: 'currentPlaceAtom', //고유한 키, 아톰 구분
  default: {
    date: '',
    sctIdx: '',
    list: [],
  },
});
