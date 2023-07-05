import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { userAtom } from '@src/recoil/user/atom';

import LoginButton from '@src/components/common/Button/LoginButton';
import useRedirect from '@src/hooks/useRedirect';
import { getLoginUri } from '@src/utils/getLoginUri';

import { loginPageCss } from './style';

interface LoginPageProps {}

const LoginPage = ({}: LoginPageProps) => {
  // const navigate = useNavigate();
  // const userState = useRecoilValue(userAtom);

  const { redirect } = useRedirect();

  const handleClickKakaoLoginButton = () => {
    redirect(getLoginUri('kakao'));
  };
  const handleClickNaverLoginButton = () => {
    redirect(getLoginUri('naver'));
  };

  useEffect(() => {
    //TODO: 로그인 상태면 메인페이지로 이동
  }, []);

  return (
    <div css={loginPageCss}>
      <LoginButton
        where="kakao"
        onClick={handleClickKakaoLoginButton}
      />
      {/* <LoginButton
        where="naver"
        onClick={handleClickNaverLoginButton}
      /> */}
    </div>
  );
};

export default LoginPage;

// 클라이언트 -> 네이버서버서버 -> 백엔드 -> 네이버 -> 백엔드
// 프론트 -> 네이버 -> 프론트 -> 백엔드 -> 네이버 -> 프론트
