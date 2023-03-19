import { userAtom } from '@src/recoil/user/atom';
import { getLoginUri } from '@src/utils/getLoginUri';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { CleanPlugin } from 'webpack';

interface OauthPageProps {}

const OauthPage = ({}: OauthPageProps) => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [userState, setUserState] = useRecoilState(userAtom);

  const get = async () => {
    const baseUrl = process.env.REAL_SERVER_URL; //getLoginUri('base');
    const where = params.where as 'kakao' | 'naver';

    const href = new URLSearchParams(location.search);
    const code = href.get('code');
    const state = href.get('state');

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

      const data = res.data.data;
      if (data) {
        setUserState(state => ({
          ...state,
          accessToken: data.accessToken,
          isLogin: true,
        }));
        navigate('/');
      } else {
        throw new Error('서버에서 데이터를 받아오지 못했습니다.');
      }
    } catch (e) {
      alert(`${e} \n로그인에 실패했습니다. \n이전 페이지로 돌아갑니다.`);
      navigate(-1);
    }
  };

  useEffect(() => {
    get();
  }, []);

  return null;
};

export default OauthPage;
