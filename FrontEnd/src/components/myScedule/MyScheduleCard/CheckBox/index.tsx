import { BsCheck } from 'react-icons/bs';
import naver from '@src/assets/svgs/naver.svg';
import { css } from '@emotion/react';
import checkIcon from '@src/assets/svgs/ico-check.svg';
import tw from 'twin.macro';

interface CheckBoxProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
}

const CheckBox = ({ onChange, isChecked }: CheckBoxProps) => {
  const checkbox2 = `
      absolute w-24 h-24 left-3.5 top-3.5 
      w-24 h-24 cursor-pointer rounded-lg appearance-none border-2 border-solid border-white z-[9] overflow-hidden
      after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black after:opacity-20 after:z-[1]
      checked:after:border-primary1 checked:border-primary1 checked:after:bg-primary1 checked:after:opacity-100 
      before:content-[''] before:absolute before:z-[11] before:w-full before:h-full before:left-0 before:right-0 before:bg-contain
      checked:before:bg-[url('/src/assets/svgs/ico-check.svg')] 
  `;
  const checkbox = tw`
    absolute w-24 h-24 left-3.5 top-3.5 
    cursor-pointer rounded-lg appearance-none border-2 border-solid border-white z-[9] overflow-hidden
    before:(content-[''] absolute z-[11] w-full h-full left-0 right-0 bg-contain)
    after:(content-[''] absolute top-0 left-0 w-full h-full bg-black opacity-20 z-[1])
    checked:border-primary1
    checked:after:(border-primary1 bg-primary1 opacity-100)
  `;
  const imagecss = tw`
    absolute w-24 h-24 left-3.5 top-3.5 
    cursor-pointer rounded-lg appearance-none border-2 border-solid border-white z-[9] overflow-hidden
  `;

  return (
    <>
      <input
        type="checkbox"
        id="checkbox"
        css={checkbox}
        onChange={onChange}
        checked={isChecked}
      />
      {isChecked && (
        <img
          src={checkIcon}
          css={imagecss}
        />
      )}
    </>
  );
};

export default CheckBox;
