import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const reviewFetch = async (idx: string) => {
  try {
    const response = await axios.get(
      `https://port-0-pretravel-ll32glc6adwo3.gksl2.cloudtype.app/like?memberIdx=${idx}`,
    );
    return response.data;
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
};

const useGetReveiw = (idx: string) =>
  useQuery(['review'], () => reviewFetch(idx));

export default useGetReveiw;
