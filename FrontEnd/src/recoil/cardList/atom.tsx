import { atom } from 'recoil';

export interface CardListI {
  id: string;
  isSeleted: boolean;
}

const cardListAtom = atom<CardListI[]>({
  key: 'cardListAtom',
  default: [],
});
export default cardListAtom;
