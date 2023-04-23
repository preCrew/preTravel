import { css } from '@emotion/react';
import checkicon from '@src/assets/svgs/ico-check.svg?url';
import tw from 'twin.macro';

interface CheckBoxProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  cheked?: boolean;
}

const CheckBox = ({ onChange, onClick, cheked }: CheckBoxProps) => {
  const checkbox = [
    tw`
    absolute w-24 h-24
    cursor-pointer rounded-lg appearance-none border-2 border-solid border-white z-[9] overflow-hidden
    before:(content-[''] absolute z-[11] w-full h-full left-0 right-0 bg-contain)
    after:(content-[''] absolute top-0 left-0 w-full h-full bg-black opacity-20 z-[1])
    checked:border-primary1
    checked:after:(border-primary1 bg-primary1 opacity-100)`,
    css`
      :checked:before {
        background-image: url(${checkicon});
      }
    `,
  ];

  return (
    <>
      <input
        type="checkbox"
        id="checkbox"
        css={checkbox}
        onClick={onClick}
        onClick={onClick}
        onChange={onChange}
        checked={cheked}
      />
    </>
  );
};

export default CheckBox;
