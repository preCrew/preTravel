import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import ovelayAtom from './ovelayAtom';

const OvelayRoot = () => {
  const ovelayState = useRecoilValue(ovelayAtom);

  return (
    <>
      {[...ovelayState.entries()].map(([id, element]) => (
        <Fragment key={id}>{element}</Fragment>
      ))}
    </>
  );
};

export default OvelayRoot;
