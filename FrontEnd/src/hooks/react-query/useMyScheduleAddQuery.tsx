import { CardListI } from '@src/recoil/cardList/atom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const add = (list: CardListI[]) => {
  const lastId = list.at(-1)!.id + 1;

  return axios.post(`${process.env.SERVEL_URL}/posts/`, {
    id: lastId,
    region: `제주도${lastId}`,
    title: '제주도여행~~~',
    dateRange: ['2022.05.24', '2022.05.27'],
    schedule: [],
  });
};
const useMyScheduleAddQuery = (list: CardListI[]) =>
  useMutation(['myScheduleAdd'], {
    mutationFn: () => add(list),
    onSuccess: () => {
      console.log('!');
    },
    onMutate: () => {
      console.log('!');
    },
    onSettled: () => {
      console.log('111');
    },
    onError: () => {
      console.log('!!!@#@!#');
    },
  });
export default useMyScheduleAddQuery;

// const useMyScheduleDelete = (list: CardListI[]) =>
//   useMutation(['myScheduleDelete'], {
//     mutationFn: () => del(list),
//   });
