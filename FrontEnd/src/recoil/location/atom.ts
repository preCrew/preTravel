import { PlaceData } from '@src/hooks/react-query/useGetPlaceQuery';
import { atom } from 'recoil';

export type LocationNowPage = 'search' | 'map';

export interface LocationAtom {
  nowPage: LocationNowPage;
  region: string;
  selectData: PlaceData;
}
export const locationAtom = atom<LocationAtom>({
  key: 'locationAtom',
  default: {
    nowPage: 'map',
    region: '',
    selectData: {
      region: '',
      address: '',
      name: '',
      roadAddress: '',
      x: '',
      y: '',
      body: '',
      idx: '',
    },
  },
});
