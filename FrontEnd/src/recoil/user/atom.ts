import { atom } from 'recoil';

export const userAtom = atom({
  key: 'userAtom',
  default: {
    isLogin: false,
    id: '',
    accessToken: '',
    testId: 12,
  },
});
