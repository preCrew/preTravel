import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import useCardListState from '../recoil/useCardListState';

const del = async (list: number[], queryClient: QueryClient) => {
  const response = await axios.delete(
    `${process.env.REAL_SERVER_URL}/schedule/`,
    {
      data: {
        idxList: list.map(v => v.toString()),
      },
    },
  );
  if (response.status === 200) {
    queryClient.invalidateQueries({ queryKey: ['mySchedule'] });
  }
  return response;
};
const useMyScheduleDeleteQuery = () => {
  const { cardList } = useCardListState();
  const queryClient = useQueryClient();
  return useMutation(['myScheduleDelete'], {
    mutationFn: () => del(cardList, queryClient),
  });
};

export default useMyScheduleDeleteQuery;
