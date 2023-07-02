import { userAtom } from '@src/recoil/user/atom';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

interface AuthRouteProps {
  children: React.ReactNode;
}
const AuthRoute = ({
  children,
}: // path,
AuthRouteProps): React.ReactElement | null => {
  // 1. recoil에 memberIdx있는지 확인
  // 2. 있으면 로그인
  // 3. 쿠키에 memberIdx 있는지 확인
  // 4. 있다면 recoil에 셋팅후 로그인
  // 5. 없다면 로그인 페이지로 이동.
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userState, setUserState] = useRecoilState(userAtom);
  const [cookies, setCookies] = useCookies(['userCookie']);

  useEffect(() => {
    if (userState.id !== '') {
      setIsAuthenticated(true);
    } else if (cookies.userCookie !== '') {
      setUserState(prev => ({ ...prev, id: cookies.userCookie }));
      setIsAuthenticated(true);
    } else {
      navigate('/login');
    }
  }, [userState.isLogin]);

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthRoute;
