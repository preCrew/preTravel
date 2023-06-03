import { fieldAtom } from '@src/recoil/form/atom';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

type fieldType = 'input' | 'select' | 'calendar';

interface InputFieldProps {
  onChange?: () => void;
  value?: string;
  fieldType?: fieldType;
  defaultVal?: string;
  children?: React.ReactNode;
}

const InputField = ({
  fieldType,
  value,
  onChange,
  children,
  defaultVal,
}: InputFieldProps) => {
  return (
    <div className="h-50 w-full overflow-hidden rounded border border-gray5 px-4">
      {fieldType === 'calendar' && children}
      {!fieldType && (
        <input
          type="text"
          onChange={onChange}
          value={value}
          className="h-full w-full text-body1"
        />
      )}
    </div>
  );
};

export default InputField;
