import axios, { AxiosError } from 'axios';
import { Response } from './responseInterfaces';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userAtom } from '@src/recoil/user/atom';

const logout = async () => {
  try {
    const response = await axios.get(
      `${process.env.REAL_SERVER_URL}/kakao/logout}`,
    );

    return;
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
};

const useGetLogout = () => {
  const setUserInfo = useSetRecoilState(userAtom);
  return useQuery(['logout'], () => logout(), {
    cacheTime: 0,
    enabled: false,

    onSuccess: () => {
      setUserInfo(state => ({
        ...state,
        id: '',
        accessToken: '',
      }));
    },
  });
};

export default useGetLogout;
