import { atom } from 'recoil';

export const userAtom = atom({
  key: 'userAtom',
  default: {
    isLogin: false,
    id: '1',
    accessToken: '',
    testId: 12,
  },
});
