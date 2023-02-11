import { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { TbAlertCircle } from 'react-icons/tb';
import { useRecoilState } from 'recoil';
import toastAtom from '@src/recoil/toast/atom';
import useToastState from './recoil/useToastState';

const ToastDiv = styled.div<{ playCloseAnimation: boolean }>(
  ({ playCloseAnimation }) => [
    tw`w-[calc(100%-var(--contentX))] h-30 bg-gray4 rounded-3xl`,
    tw`flex items-center text-body3 pl-5`,
    playCloseAnimation ? tw`animate-up` : tw`animate-down`,
  ],
);

const useToast = () => {
  const { toastState, setIsToastOpen, setPlayCloseAnimation } = useToastState();

  const showToast = () => {
    setIsToastOpen(true);

    setTimeout(() => {
      setPlayCloseAnimation(true);
    }, 2600);
    setTimeout(() => {
      setIsToastOpen(false);
      setPlayCloseAnimation(false);
    }, 3000);
  };

  const Toast = () => {
    return (
      <>
        {toastState.isToastOpen && (
          <ToastDiv playCloseAnimation={toastState.playCloseAnimation}>
            <TbAlertCircle css={tw`text-primary8 text-xl mr-2`} />
            {toastState.msg}
          </ToastDiv>
        )}
      </>
    );
  };

  return { Toast, showToast };
};

export default useToast;
