import BottomSheet from '@src/components/BottomSheet';
import React, { useState, useRef } from 'react';
import { SheetRef } from 'react-modal-sheet';

interface BottomSheetWrapProps {
  drag: boolean;
  children: React.ReactNode;
  snapIndex?: number | undefined;
  // onClickSnap?: (snap: number) => void;
  setMoreOnClick?: React.Dispatch<React.SetStateAction<boolean>>;
  moreOnClick?: boolean;
}

const BottomSheetWrap = ({
  drag,
  children,
  moreOnClick,
  setMoreOnClick,
  snapIndex,
}: BottomSheetWrapProps) => {
  return (
    <BottomSheet
      snapIndex={snapIndex}
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
