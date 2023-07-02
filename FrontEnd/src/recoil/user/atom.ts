import { atom } from 'recoil';

export const userAtom = atom({
  key: 'userAtom',
  default: {
    isLogin: false,
    id: '12',
    accessToken: '',
    testId: 12,
    info: {
      likespot: [],
      member: null,
      review: [],
      schedule: [],
    },
  },
});
