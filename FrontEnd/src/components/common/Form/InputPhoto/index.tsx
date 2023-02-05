import React, { useState } from 'react';
import { HiOutlinePhotograph, HiPlusSm } from 'react-icons/hi';
import Input from '../style';

interface InputPhotoProps {
  fileName: string;
  onChange: (event: React.ChangeEvent) => void;
}

const InputPhoto = ({ fileName, onChange }: InputPhotoProps) => {
  return (
    <div className={Input.photo}>
      <input
        type="file"
        className={Input.file}
        accept="image/jpg,impge/png,image/jpeg,image/gif"
        onChange={onChange}
      />
      <i className="relative">
        <HiOutlinePhotograph
          fontSize="24px"
          className="border-gray1"
        />
        <HiPlusSm
          fontSize="20px"
          className="absolute left-[14px] top-[-11px] border-gray1"
        />
      </i>
      <img src={fileName} />
    </div>
  );
};

export default InputPhoto;
