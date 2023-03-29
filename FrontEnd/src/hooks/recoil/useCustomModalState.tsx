import { customModalAtom } from '@src/recoil/customModal/atom';
import { useRecoilState } from 'recoil';

const useCustomModalState = () => {
  const [state, setState] = useRecoilState(customModalAtom);

  const addModal = (name: string) => {
    setState(prev => [
      ...prev,
      {
        name,
        isOpen: false,
        inUnMount: false,
        isUpdate: false,
      },
    ]);
  };

  const deleteModal = (modalName: string) => {
    setState(prev => prev.filter(modal => modal.name !== modalName));
  };

  const showModal = (modalName: string) => {
    setState(prev =>
      prev.map(modal =>
        modal.name === modalName
          ? {
              ...modal,
              isOpen: true,
            }
          : modal,
      ),
    );
  };

  const closeModal = (modalName: string) => {
    setState(prev =>
      prev.map(modal =>
        modal.name === modalName
          ? {
              ...modal,
              isOpen: false,
            }
          : modal,
      ),
    );
  };

  return { addModal, deleteModal, showModal, closeModal, state };
};

export default useCustomModalState;
