import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { userAtom } from '@src/recoil/user/atom';

const getUser = async (idx: string) => {
  try {
    const response = await axios.get(
      `${process.env.REAL_SERVER_URL}/myPage?memberIdx=${idx}`,
    );
    return response.data.data;
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
};

const useGetUserInfo = (idx: string) => {
  const [userInfoState, setUserInfoState] = useRecoilState(userAtom);

  return useQuery(['getUserInfo'], () => getUser(idx), {
    // enabled: false,
    // cacheTime: 50000,
    // staleTime: 50000,
    onSuccess: data => {
      setUserInfoState(state => ({
        ...state,
        info: data,
      }));
    },
  });
};

export default useGetUserInfo;
