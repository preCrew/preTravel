import { selector } from 'recoil';
import cardListAtom from './atom';

const filteredCardListSelector = selector({
  key: 'cardListSelector',
  get: ({ get }) => {
    const cardList = get(cardListAtom);
    const selected = cardList.length;
    return selected;
  },
});

export default filteredCardListSelector;
