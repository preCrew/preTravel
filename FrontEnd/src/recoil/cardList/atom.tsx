import { atom } from 'recoil';

// export interface CardListI {
//   id: number;
//   isSeleted: boolean;
// }

const cardListAtom = atom<number[]>({
  key: 'cardListAtom',
  default: [],
});
export default cardListAtom;
