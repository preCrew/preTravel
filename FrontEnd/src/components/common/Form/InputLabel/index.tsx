import React from 'react';

interface InputLableProps {
  labelName?: string;
  necessary: boolean;
}

const InputLabel = ({ labelName, necessary = true }: InputLableProps) => {
  return (
    <label className="mb-2 block text-body3Bold">
      {necessary && <strong className="text-red-600">*</strong>}
      {labelName}
    </label>
  );
};

export default InputLabel;
