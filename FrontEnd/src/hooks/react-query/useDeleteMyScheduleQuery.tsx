// import { CardListI } from '@src/recoil/cardList/atom';
import cardListAtom from '@src/recoil/cardList/atom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRecoilValue } from 'recoil';

const del = (list: number[]) => {
  return Promise.all(
    list.map(id =>
      axios.delete(`${process.env.REAL_SERVER_URL}/schedule/`, {
        data: { idx: id },
        // method: 'DELETE',
      }),
    ),
  );
};
const useMyScheduleDeleteQuery = () => {
  const list = useRecoilValue(cardListAtom);
  return useMutation(['myScheduleDelete'], {
    mutationFn: () => del(list),
  });
};

export default useMyScheduleDeleteQuery;
