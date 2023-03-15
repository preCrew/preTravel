import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const likeFetch = async (idx: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/like?memberIdx=${idx}`,
    );
    return response.data;
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
};

const useGetLike = (idx: string) => useQuery(['like'], () => likeFetch(idx));

export default useGetLike;
