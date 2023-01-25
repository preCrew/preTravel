import { selectedDayAtom } from '@src/recoil/date/atom';
import { selector } from 'recoil';

const withSelectedDay = selector({
  key: 'widthDiffArr',
  get: ({ get }) => {
    const days = get(selectedDayAtom);
    return days + 1;
  },
  //set: ({ get, set }, newValue) => set(dateAtom, newValue),
});

export default withSelectedDay;
