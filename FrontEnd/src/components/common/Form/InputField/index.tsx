import { fieldAtom } from '@src/recoil/form/atom';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

type fieldType = 'input' | 'select' | 'calendar';

interface InputFieldProps {
  onChange?: () => void;
  value?: string;
  fieldType?: fieldType;
  children?: React.ReactNode;
}

const InputField = ({
  fieldType,
  value,
  onChange,
  children,
}: InputFieldProps) => {
  return (
    <div className="w-full px-4 overflow-hidden border rounded border-gray5 h-50">
      {fieldType === 'calendar' && children}
      {!fieldType && (
        <input
          type="text"
          onChange={onChange}
          value={value}
          className="w-full h-full"
        />
      )}
    </div>
  );
};

export default InputField;
