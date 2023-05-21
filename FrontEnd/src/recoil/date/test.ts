import { atom } from 'recoil';

const testDataAtom = atom({
  key: 'testDataAtom',
  default: null,
});

export { testDataAtom };
