import BottomSheet from '@src/components/BottomSheet';
import React from 'react';

interface BottomSheetWrapProps {
  drag: boolean;
  children: React.ReactNode;
}

const BottomSheetWrap = ({ drag, children }: BottomSheetWrapProps) => {
  return (
    <BottomSheet
      dragOn={drag}
      bg={false}
    >
      {children}
    </BottomSheet>
  );
};

export default BottomSheetWrap;
