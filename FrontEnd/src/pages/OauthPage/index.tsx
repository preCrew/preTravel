import { getLoginUri } from '@src/utils/getLoginUri';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface OauthPageProps {}

const OauthPage = ({}: OauthPageProps) => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const get = async () => {
    const baseUrl = getLoginUri('base');
    const where = params.where as 'kakao' | 'naver';

    const href = new URLSearchParams(location.search);
    const code = href.get('code');
    const state = href.get('state');

    console.log("oauth page")
    try {
      setIsLoading(true);

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
      // const data = JSON.parse(res.data.data);
      const data = res.data.data;

      setIsLoading(false);
      setData(data.accessToken);
      // TODO: 로그인 성공시 메인페이지로 이동
      // alert('TEST: 로그인 성공, access')
      // navigate('/');
      
    } catch (e) {
      // TODO: 로그인 실패시 로그인 페이지 그대로, alert로 error 메세지 출력
      console.log('error: ', e);
      // alert('로그인에 실패했습니다. 로그인 페이지로 돌아갑니다.');
      // navigate(-1);
    }
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <>
      <p>here is oauth page {params.where}</p>
      <p>{isLoading ? 'now loading data...' : `accessToken-> ${data}`}</p>
    </>
  );
};

export default OauthPage;
