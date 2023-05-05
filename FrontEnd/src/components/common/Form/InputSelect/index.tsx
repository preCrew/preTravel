import React from 'react';

interface PropsInputSelect {
  onchange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const InputSelect = ({ onchange }: PropsInputSelect) => {
  const selectNumber = Array(20).fill(undefined);
  const defaultTitle = ['선택해주세요.'];
  const selectData = [...defaultTitle, ...selectNumber];

  return (
    <select onChange={onchange}>
      {selectData.map((v, i) => {
        if (!v) {
          v = i;
        }
        return <option>{v}</option>;
      })}
    </select>
  );
};

export default InputSelect;
