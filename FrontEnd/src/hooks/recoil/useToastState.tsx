import toastAtom, { ToastState } from '@src/recoil/toast/atom';
import { useRecoilState } from 'recoil';

const useToastState = () => {
  const [toastState, setToastState] = useRecoilState(toastAtom);

  const addToast = (id: string, msg: string) => {
    const newToast: ToastState = {
      id,
      msg,
      playCloseAnimation: false,
    };
    setToastState(prev => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToastState(prev => prev.filter(toast => toast.id !== id));
  };

  const setPlayCloseAnimation = (id: string, playCloseAnimation: boolean) => {
    setToastState(prev =>
      prev.map(toast =>
        toast.id === id ? { ...toast, playCloseAnimation } : { ...toast },
      ),
    );
  };

  return { toastState, addToast, removeToast, setPlayCloseAnimation };
};

export default useToastState;
