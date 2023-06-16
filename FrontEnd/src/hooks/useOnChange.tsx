import { ChangeEvent, useState } from 'react';

const useOnChange = (text?: string) => {
  const [value, setValue] = useState(text ?? '');
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  return { value, onChange, setValue };
};

export default useOnChange;
