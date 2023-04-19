import { useEffect } from 'react';

import useCustomModalState from './recoil/useCustomModalState';

import ModalWrap from '@src/components/Modal';

interface ModalProps {
  children: React.ReactNode;
  noClose?: boolean;
}
const useModal = (modalName: string) => {
  const { addModal, deleteModal, showModal, closeModal, state } =
    useCustomModalState();
  const nowModal = state.find(modal => modal.name === modalName);

  useEffect(() => {
    addModal(modalName);
    return () => deleteModal(modalName);
  }, []);

  const handleClose = () => {
    closeModal(modalName);
  };

  const Modal = ({ children, noClose }: ModalProps) => {
    return (
      <>
        {nowModal?.isOpen && (
          <ModalWrap
            onClose={handleClose}
            noClose={noClose}
          >
            {children}
          </ModalWrap>
        )}
      </>
    );
  };

  return {
    showModal: () => showModal(modalName),
    closeModal: () => closeModal(modalName),
    Modal,
  };
};

export default useModal;
