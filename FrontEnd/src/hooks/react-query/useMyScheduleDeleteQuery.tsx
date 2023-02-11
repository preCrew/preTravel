import { CardListI } from '@src/recoil/cardList/atom';
import getServerUri from '@src/utils/getServerUri';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const serverUri = getServerUri();
const del = (list: CardListI[]) => {
  return Promise.all(
    list.map(
      item => item.isSeleted && axios.delete(`${serverUri}/posts/${item.id}`),
    ),
  );
};
const useMyScheduleDeleteQuery = (list: CardListI[]) =>
  useMutation(['myScheduleDelete'], {
    mutationFn: () => del(list),
  });

export default useMyScheduleDeleteQuery;
