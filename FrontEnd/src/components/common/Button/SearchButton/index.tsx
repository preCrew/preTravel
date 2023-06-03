import tw from 'twin.macro';

import { BiSearch } from 'react-icons/bi';
import Button, { ButtonColors } from '..';

interface SearchButtonProps {
  onClickSearchButton?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  onChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
  inputVal?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  className?: string;
  placeHolder: string;
  bgColor: ButtonColors;
}

const SearchButton = ({
  onClickSearchButton,
  onChangeInput,
  onSubmit,
  inputVal,
  inputRef,
  className,
  placeHolder,
  bgColor,
}: SearchButtonProps) => {
  return (
    <Button
      onClick={onClickSearchButton}
      type="none"
      color={bgColor}
      css={tw`flex items-center justify-start text-black cursor-text w-[calc(100%-var(--contentX))] h-40 m-2 rounded-3xl`}
      className={className}
    >
      <div
        css={tw`p-2 cursor-pointer`}
        onClick={onSubmit}
      >
        <BiSearch className="text-2xl" />
      </div>
      <input
        type="text"
        value={inputVal}
        onChange={onChangeInput}
        ref={inputRef}
        css={tw`w-full h-full bg-transparent outline-none text-body1Bold`}
        placeholder={placeHolder}
        onKeyUp={e => e.key === 'Enter' && onSubmit?.()}
      />
    </Button>
  );
};

export default SearchButton;
