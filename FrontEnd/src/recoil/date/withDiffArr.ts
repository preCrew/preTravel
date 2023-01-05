import { selector } from 'recoil';
import dateAtom from './atom';

const widthDiffArr = selector({
  key: 'widthDiffArr',
  get: ({ get }) => `${get(dateAtom)}`,
  //set: ({ get, set }, newValue) => set(dateAtom, newValue),
});

export default widthDiffArr;
