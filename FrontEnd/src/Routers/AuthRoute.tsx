import { userAtom } from '@src/recoil/user/atom';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

interface AuthRouteProps {
  children: React.ReactNode;
}
const AuthRoute = ({ children }: AuthRouteProps): React.ReactElement | null => {
  const navigate = useNavigate();

  const [userState, setUserState] = useRecoilState(userAtom);
  const [cookies, setCookies] = useCookies(['userCookie']);

  useEffect(() => {
    if (cookies.userCookie) {
      setUserState(prev => ({ ...prev, id: cookies.userCookie }));
    } else {
      navigate('/login');
    }
  }, []);

  return <>{children}</>;
};

export default AuthRoute;
