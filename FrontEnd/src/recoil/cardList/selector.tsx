import { selector } from 'recoil';
import cardListAtom from './atom';

const filteredCardListSelector = selector({
  key: 'cardListSelector',
  get: ({ get }) => {
    const cardList = get(cardListAtom);
    const selected = cardList.filter(card => card.isSeleted).length;
    return selected;
  },
});

export default filteredCardListSelector;
