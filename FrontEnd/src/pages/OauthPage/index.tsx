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
    const baseUrl =
      'https://port-0-pretravel-ll32glc6adwo3.gksl2.cloudtype.app';
    const where = params.where as 'kakao' | 'naver';

    const href = new URLSearchParams(location.search);
    const code = href.get('code');
    const state = href.get('state');

    try {
      setIsLoading(true);

      const reqUrl = {
        kakao: `${baseUrl}/oauth/${where}?code=${code}`,
        naver: `${baseUrl}/oauth/${where}?code=${code}&state=${state}`,
      };

      const res = await axios.get(reqUrl[where], {
        withCredentials: true,
      });
      const data = JSON.stringify(res.data);

      setIsLoading(false);
      setData(data);
    } catch (e) {
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
