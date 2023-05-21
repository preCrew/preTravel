import { atom } from 'recoil';

interface CustomModalAtom {
  name: string;
  isOpen: boolean;
  inUnMount: boolean;
  isUpdate: boolean;
}

export const customModalAtom = atom<CustomModalAtom[]>({
  key: 'customModalAtom',
  default: [],
});
