import { atom } from 'recoil';

export type LocationNowPage = 'search' | 'map';
export interface LocationAtom {
  nowPage: LocationNowPage;
  region: string;
  place: string;
}
export const locationAtom = atom<LocationAtom>({
  key: 'locationAtom',
  default: { nowPage: 'map', place: '', region: '' },
});
