import React, { MouseEvent } from 'react';
import ModalPortal from './ModalPortal';
import { Keyframes } from '@emotion/react';
import tw from 'twin.macro';

interface ModalProps {
  animationMs?: number;
  openAnimation?: Keyframes;
  closeAnimation?: Keyframes;
  onClose: () => void;
  children: React.ReactNode;
  noClose?: boolean;
  // modalName: string;
}

const Modal = ({ animationMs, onClose, children, noClose }: ModalProps) => {
  const handleClickInnerModal = (e: MouseEvent<HTMLDivElement>) => {
    // ModalWrapper로 이벤트 전파 방지
    e.stopPropagation();
  };
  const handleClose = () => {
    !noClose && onClose();
  };

  return (
    <ModalPortal>
      <div
        css={tw`fixed left-0 top-0 z-[1000] w-full h-full bg-[rgba(0,0,0,0.5)]`}
        onClick={handleClose}
      >
        <div
          css={tw`w-h-full `}
          onClick={handleClose}
        >
          <div
            onClick={handleClickInnerModal}
            css={tw`w-h-full `}
          >
            {children}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default React.memo(Modal);
