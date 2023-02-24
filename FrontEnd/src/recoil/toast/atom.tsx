import { atom } from 'recoil';
export interface ToastState {
  id: string;
  msg: string;
  playCloseAnimation: boolean;
}

const toastAtom = atom<ToastState[]>({
  key: 'toastAtom',
  default: [],
});

export default toastAtom;
