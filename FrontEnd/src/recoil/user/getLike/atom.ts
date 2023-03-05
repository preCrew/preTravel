import { atom } from 'recoil';

interface IuserLike {
  idx: string | null;
  memberIdx: string | null;
  name: string | null;
  address: string | null;
  latitude: string | null;
  longitude: string | null;
}

export const userFavoriteAtom = atom<IuserLike[]>({
  key: 'userFavoriteAtom',
  default: [
    {
      idx: null,
      memberIdx: null,
      name: null,
      address: null,
      latitude: null,
      longitude: null,
    },
  ],
});
