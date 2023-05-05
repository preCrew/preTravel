import React, { useState } from 'react';
import { HiOutlinePhotograph, HiPlusSm } from 'react-icons/hi';
import Input from '../style';

interface InputPhotoProps {
  file: {
    idx: string;
    dir: string;
  };
  onChange: (event: React.ChangeEvent) => void;
}

const InputPhoto = ({ file, onChange }: InputPhotoProps) => {
  console.log(file);
  return (
    <>
      <div className={Input.photo}>
        {file.dir ? (
          <img
            src={file.dir}
            className="h-full w-full object-cover"
          />
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  );
};

export default InputPhoto;
