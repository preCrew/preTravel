import { useRecoilState } from 'recoil';
import ovelayAtom from './ovelayAtom';

const useOvelayState = () => {
  const [state, setState] = useRecoilState(ovelayAtom);

  const addOvelay = (key: number, value: React.ReactNode) => {
    setState(prev => {
      const clone = new Map(prev);
      clone.set(key, value);
      return clone;
    });
  };

  const deleteOvelay = (key: number) => {
    setState(prev => {
      const clone = new Map(prev);
      clone.delete(key);
      return clone;
    });
  };

  return { ovelayState: state, addOvelay, deleteOvelay };
};

export default useOvelayState;
