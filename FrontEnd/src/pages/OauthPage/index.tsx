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
    const getUserData = async () => {
      await fetchUserMemeberIdx();

      if (isSuccess) {
        setUserState(state => ({
          ...state,
          accessToken: userMemberIdx.accessToken,
          isLogin: true,
          id: userMemberIdx.id,
        }));
        setCookies('userCookie', userMemberIdx.id, { path: '/' });
        navigate('/');
      } else if (isError) {
        alert(isError);
        navigate('/');
      }
    };
    getUserData();
  }, []);

  return null;
};

export default OauthPage;
