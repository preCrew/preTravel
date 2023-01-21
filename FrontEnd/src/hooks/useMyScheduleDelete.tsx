import { CardListI } from '@src/recoil/cardList/atom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const del = (list: CardListI[]) => {
  return Promise.all(
    list.map(
      item =>
        item.isSeleted &&
        axios.delete(`http://localhost:3001/posts/${item.id}`),
    ),
  );
};
const useMyScheduleDelete = (list: CardListI[]) =>
  useMutation(['myScheduleDelete'], {
    mutationFn: () => del(list),
  });

export default useMyScheduleDelete;
