import { useEffect, useRef } from 'react';
import useOvelayState from './useOvelayState';

export type OvelayElement = (props: { close: () => void }) => JSX.Element;

const useOvelay = () => {
  const { addOvelay, deleteOvelay } = useOvelayState();
  const id = useRef<number>(0);

  useEffect(() => {
    id.current++;
    deleteOvelay(id.current);
  }, []);

  const handleClose = () => {
    deleteOvelay(id.current);
  };

  return {
    open: (OvelayElement: OvelayElement) => {
      addOvelay(id.current, <OvelayElement close={handleClose} />);
    },
    close: () => {
      deleteOvelay(id.current);
    },
  };
};

export default useOvelay;
