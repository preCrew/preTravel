import BottomSheet from '@src/components/BottomSheet';
import React, { useState, useRef } from 'react';
import { SheetRef } from 'react-modal-sheet';

interface BottomSheetWrapProps {
  drag: boolean;
  children: React.ReactNode;
  // onClickSnap?: (snap: number) => void;
  setMoreOnClick?: React.Dispatch<React.SetStateAction<boolean>>;
  moreOnClick?: boolean;
}

const BottomSheetWrap = ({
  drag,
  children,
  moreOnClick,
  setMoreOnClick,
}: BottomSheetWrapProps) => {
  return (
    <BottomSheet
      dragOn={drag}
      bg={false}
      setMoreOnClick={setMoreOnClick}
      moreOnClick={moreOnClick}
    >
      {children}
    </BottomSheet>
  );
};

export default BottomSheetWrap;
