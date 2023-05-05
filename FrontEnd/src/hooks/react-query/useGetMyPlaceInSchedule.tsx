import { useQuery } from '@tanstack/react-query';

import axios from 'axios';

const getData = async (postId: string) => {
  try {
    const response = await axios.get(
      `${process.env.REAL_SERVER_URL}/spot?sctIdx=${postId}`,
    );
    console.log(response.data);
    return response.data.data;
  } catch (err) {
    if (err instanceof Error) console.log(err);
  }
};

const useGetMyPlaceInSchedule = (postId: string) =>
  useQuery(['myPlaceInSchedule', postId], () => getData(postId));

export default useGetMyPlaceInSchedule;
