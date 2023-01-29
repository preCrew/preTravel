import LoginButton from '@src/components/common/Button/LoginButton';
import useRedirect from '@src/hooks/useRedirect';
import { getLoginUri } from '@src/utils/getLoginUri';
import { useNavigate } from 'react-router-dom';
import { loginPageCss } from './style';

interface LoginPageProps {}

const LoginPage = ({}: LoginPageProps) => {
  const navigate = useNavigate();
  const { redirect } = useRedirect();

  const handleClickKakaoLoginButton = () => {
    // navigate('/redirect', { state: { url: getLoginUri('kakao') } });
    // window.open(getLoginUri('kakao'));
    redirect(getLoginUri('kakao'));
  };
  const handleClickNaverLoginButton = () => {
    // navigate('/redirect', { state: { url: getLoginUri('naver') } });
    // window.open(getLoginUri('naver'));
    redirect(getLoginUri('naver'));
  };

  return (
    <div css={loginPageCss}>
      <LoginButton
        where="kakao"
        onClick={handleClickKakaoLoginButton}
      />
      <LoginButton
        where="naver"
        onClick={handleClickNaverLoginButton}
      />
    </div>
  );
};

export default LoginPage;

// 클라이언트 -> 네이버서버서버 -> 백엔드 -> 네이버 -> 백엔드
// 프론트 -> 네이버 -> 프론트 -> 백엔드 -> 네이버 -> 프론트
