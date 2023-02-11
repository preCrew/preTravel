import toastAtom from '@src/recoil/toast/atom';
import { useRecoilState } from 'recoil';

const useToastState = () => {
  const [toastState, setToastState] = useRecoilState(toastAtom);

  const setIsToastOpen = (isToastOpen: boolean) => {
    setToastState(prev => ({ ...prev, isToastOpen }));
  };

  const setPlayCloseAnimation = (playCloseAnimation: boolean) => {
    setToastState(prev => ({ ...prev, playCloseAnimation }));
  };

  const setMsg = (msg: string) => {
    setToastState(prev => ({ ...prev, msg }));
  };

  return { toastState, setIsToastOpen, setPlayCloseAnimation, setMsg };
};

export default useToastState;
