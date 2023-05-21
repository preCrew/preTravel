import { atom } from 'recoil';

export const userReviewAtom = atom({
  key: 'userReviewAtom',
  default: {
    id: '',
    title: '',
    address: '',
    image: '',
    positions: {
      latitude: null,
      longitude: null,
    },
  },
});
