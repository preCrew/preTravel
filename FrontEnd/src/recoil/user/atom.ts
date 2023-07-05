import { atom } from 'recoil';

export const userAtom = atom({
  key: 'userAtom',
  default: {
    isLogin: false,
    id: '',
    accessToken: '',
    info: {
      likespot: [],
      member: null,
      review: [],
      schedule: [],
    },
  },
});
