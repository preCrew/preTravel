import { atom } from 'recoil';

const searchPageAtom = atom({
  key: 'searchPageAtom',
  default: {
    searchValue: '',
  },
});

export default searchPageAtom;
