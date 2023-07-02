import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@src/recoil/user/atom';

import useGetUserMemeberIdx from '@src/hooks/react-query/useGetUserMemberIdx';

import useLocationSearch from '@src/hooks/useLocationSearch';
import { useCookies } from 'react-cookie';

interface OauthPageProps {}

const OauthPage = ({}: OauthPageProps) => {
  const params = useParams();
  const { getQueryString } = useLocationSearch();
  const navigate = useNavigate();

  const setUserState = useSetRecoilState(userAtom);

  const where = params.where as 'kakao' | 'naver';
  const code = getQueryString('code') as string;
  const state = getQueryString('state') as string;

  const [cookies, setCookies] = useCookies(['userCookie']);

  const {
    refetch: fetchUserMemeberIdx,
    data: userMemberIdx,
    isSuccess,
    isError,
  } = useGetUserMemeberIdx({
    where,
    code,
    state,
  });

  useEffect(() => {
    fetchUserMemeberIdx();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setUserState(state => ({
        ...state,
        accessToken: userMemberIdx.accessToken,
        isLogin: true,
        id: userMemberIdx.id,
      }));
      setCookies('userCookie', userMemberIdx.id, { path: '/' });
      navigate('/');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      alert(isError);
      navigate('/');
    }
  }, [isError]);
  // const get = async () => {
  // const baseUrl = process.env.REAL_SERVER_URL; //getLoginUri('base');
  // const where = params.where as 'kakao' | 'naver';
  // // const href = new URLSearchParams(location.search);
  // const code = getQueryString('code');
  // const state = getQueryString('state');
  // try {
  //   const reqUrl = {
  //     kakao: `${baseUrl}/oauth/${where}?code=${code}`,
  //     naver: `${baseUrl}/oauth/${where}?code=${code}&state=${state}`,
  //   };
  //   const res = await axios.get(reqUrl[where], {
  //     withCredentials: true,
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const data = res.data.data;
  //   if (data) {
  //     setUserState(state => ({
  //       ...state,
  //       accessToken: data.accessToken,
  //       isLogin: true,
  //     }));
  //     navigate('/');
  //   } else {
  //     throw new Error('서버에서 데이터를 받아오지 못했습니다.');
  //   }
  // } catch (e) {
  //   alert(`${e} \n로그인에 실패했습니다. \n이전 페이지로 돌아갑니다.`);
  //   navigate(-1);
  // }
  // };

  return null;
};

export default OauthPage;
