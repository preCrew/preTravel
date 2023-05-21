import { useState } from 'react';
import tw from 'twin.macro';

import { BiSearch } from 'react-icons/bi';
import Button, { ButtonColors } from '..';

import useLocationState from '@src/hooks/recoil/useLocationState';
import { Interpolation, Theme } from '@emotion/react';

interface SearchButtonProps {
  onClickSearchButton?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  onChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
  nowPage: 'map' | 'search';
  inputVal?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  css?: Interpolation<Theme>;
}

const SearchButton = ({
  onClickSearchButton,
  onChangeInput,
  onSubmit,
  nowPage,
  inputVal,
  inputRef,
  css,
}: SearchButtonProps) => {
  const [state, _] = useState({
    bgColor: {
      map: 'gray2',
      search: 'gray3',
    },
    placeHolders: {
      region: '지역을 입력해주세요',
      place: '장소를 입력해주세요',
    },
  });

  const {
    locationState: { region },
  } = useLocationState();

  // const handleSubmit = () => {
  //   onSubmit?.();
  //   setIsCommit?.(true);
  // };

  return (
    <Button
      onClick={onClickSearchButton}
      type="none"
      color={state.bgColor[nowPage] as ButtonColors}
      css={[
        tw`flex items-center justify-start text-black cursor-text w-[calc(100%-var(--contentX))] h-40 m-2 rounded-3xl`,
        `margin-right: ${nowPage === 'search' ? '0.45rem' : '0'};`,
        ,
        css,
      ]}
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
        placeholder={
          region ? state.placeHolders.place : state.placeHolders.region
        }
        onKeyUp={e => e.key === 'Enter' && onSubmit?.()}
      />
    </Button>
  );
};

export default SearchButton;
