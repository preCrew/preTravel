import { atom } from 'recoil';

export const categoryAtom = atom<any>({
  key: 'categoryAtom', //고유한 키, 아톰 구분
  default: {
    category: {
      title: '',
      image: '',
      place: null,
      type: null,
      //type: number;
      // onClick: ({ categoryType }: Tcategory) => void;
    },
  },
});
