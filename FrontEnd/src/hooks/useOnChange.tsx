import { ChangeEvent, useState } from 'react';

const useOnChange = () => {
  const [value, setValue] = useState('');
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  return { value, onChange, setValue };
};

export default useOnChange;
