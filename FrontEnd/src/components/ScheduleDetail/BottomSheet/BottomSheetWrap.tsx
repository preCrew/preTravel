import BottomSheet from '@src/components/BottomSheet';
import React, { useState, useRef } from 'react';
import { SheetRef } from 'react-modal-sheet';

interface BottomSheetWrapProps {
  drag: boolean;
  children: React.ReactNode;
  snapIdx?: number;
  snapIndex?: number | undefined;
  close?: boolean;
  // onClickSnap?: (snap: number) => void;
  setMoreOnClick?: React.Dispatch<React.SetStateAction<boolean>>;
  moreOnClick?: boolean;
}

const BottomSheetWrap = ({
  drag,
  children,
  moreOnClick,
  setMoreOnClick,
  snapIdx,
  snapIndex,
  close,
}: BottomSheetWrapProps) => {
  return (
    <BottomSheet
      snapIdx={snapIdx}
      snapIndex={snapIndex}
      dragOn={drag}
      bg={false}
      close={close}
      setMoreOnClick={setMoreOnClick}
      moreOnClick={moreOnClick}
    >
      {children}
    </BottomSheet>
  );
};

export default BottomSheetWrap;
