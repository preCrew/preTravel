import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface IUserMemberIdx {
  where: 'kakao' | 'naver';
  code: string;
  state: string;
}
const getMemeberIdx = async ({ where, code, state }: IUserMemberIdx) => {
  const baseUrl = process.env.REAL_SERVER_URL;

  try {
    const reqUrl = {
      kakao: `${baseUrl}/oauth/${where}?code=${code}`,
      naver: `${baseUrl}/oauth/${where}?code=${code}&state=${state}`,
    };

    const res = await axios.get(reqUrl[where], {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const userLoginData = res.data.data;
    if (userLoginData) {
      return userLoginData;
    } else {
      throw new Error('서버에서 데이터를 받아오지 못했습니다.', { cause: '1' });
    }
  } catch (e) {
    throw new Error(
      `${e} \n로그인에 실패했습니다. \n이전 페이지로 돌아갑니다.`,
      { cause: '2' },
    );
  }
};
const useGetUserMemeberIdx = (userMemberIdx: IUserMemberIdx) => {
  return useQuery(['userMemberIdx'], () => getMemeberIdx(userMemberIdx), {
    enabled: false,
  });
};

export default useGetUserMemeberIdx;
