// // import { CardListI } from '@src/recoil/cardList/atom';
// import cardListAtom from '@src/recoil/cardList/atom';
// import {
//   QueryClient,
//   useMutation,
//   useQueryClient,
// } from '@tanstack/react-query';
// import axios from 'axios';
// import { useRecoilValue } from 'recoil';

// const del = async (idx: string) => {
//   const response = await axios.delete(
//     `${process.env.REAL_SERVER_URL}/spot/`,
//     {
//       data: {
//         idxList: list.map(v => v.toString()),
//       },
//     },
//   );
//   if (response.status === 200) {
//     queryClient.invalidateQueries({ queryKey: ['mySchedule'] });
//   }
//   return response;
// };
// const useDeletePlaceinSchedule = () => {
//   const list = useRecoilValue(cardListAtom);
//   const queryClient = useQueryClient();
//   return useMutation(['myScheduleDelete'], {
//     mutationFn: () => del(list, queryClient),
//   });
// };

// export default useDeletePlaceinSchedule;
