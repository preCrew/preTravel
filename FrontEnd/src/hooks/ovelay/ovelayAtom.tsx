import { atom } from 'recoil';

const ovelayAtom = atom<Map<number, React.ReactNode>>({
  key: 'ovelayAtom',
  default: new Map(),
});

export default ovelayAtom;
