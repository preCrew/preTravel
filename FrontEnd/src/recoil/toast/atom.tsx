import { atom } from 'recoil';
interface ToastState {
  msg: string;
  isToastOpen: boolean;
  playCloseAnimation: boolean;
}

const toastAtom = atom<ToastState>({
  key: 'toastAtom',
  default: {
    msg: '',
    isToastOpen: false,
    playCloseAnimation: false,
  },
});

export default toastAtom;
