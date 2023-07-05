import { userAtom } from '@src/recoil/user/atom';
import { useCookies } from 'react-cookie';
import { useSetRecoilState } from 'recoil';

const useLogout = () => {
  const [_, __, removeCookies] = useCookies(['userCookie']);
  const setUserState = useSetRecoilState(userAtom);

  const logout = () => {
    removeCookies('userCookie');
    setUserState(prev => ({ ...prev, isLogin: false, id: '' }));
  };

  return { logout };
};

export default useLogout;
