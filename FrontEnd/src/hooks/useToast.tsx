import tw, { styled } from 'twin.macro';
import { TbAlertCircle } from 'react-icons/tb';
import useToastState from './recoil/useToastState';

const ToastDiv = styled.div<{ playCloseAnimation: boolean }>(
  ({ playCloseAnimation }) => [
    tw`w-[calc(100%-var(--contentX))] h-30 bg-gray4 rounded-3xl z-[25]`,
    tw`flex items-center text-body3 pl-5`,
    playCloseAnimation ? tw`animate-up` : tw`animate-down`,
  ],
);

const useToast = () => {
  const { toastState, addToast, removeToast, setPlayCloseAnimation } =
    useToastState();

  const showToast = (id: string, msg: string) => {
    addToast(id, msg);

    setTimeout(() => {
      setPlayCloseAnimation(id, true);
    }, 2000);
    setTimeout(() => {
      removeToast(id);
      setPlayCloseAnimation(id, false);
    }, 3000);
  };

  const Toast = () => {
    return (
      <>
        {toastState.map(toast => (
          <ToastDiv
            playCloseAnimation={toast.playCloseAnimation}
            key={toast.id}
          >
            <TbAlertCircle css={tw`text-primary8 text-xl mr-2`} />
            {toast.msg}
          </ToastDiv>
        ))}
      </>
    );
  };

  return { Toast, showToast };
};

export default useToast;
