import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import tw, { TwComponentMap, TwFn } from 'twin.macro';

import { BiSearch } from 'react-icons/bi';
import Button, { ButtonColors } from '..';

import useLocationState from '@src/hooks/recoil/useLocationState';
import useOnChange from '@src/hooks/useOnChange';

interface SearchButtonProps {
  onClickSearchButton?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  onClickSearchIcon?: () => void;
  onKeydownInput?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  nowPage: 'map' | 'search';
  // isCompleteInputRegion?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const SearchButton = ({
  onClickSearchButton,
  onClickSearchIcon,
  onKeydownInput,
  nowPage,
  // isCompleteInputRegion,
  inputRef,
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
  const { value: inputVal, onChange: onChangeInput } = useOnChange();
  const { locationState } = useLocationState();
  console.log(locationState);

  return (
    <Button
      onClick={onClickSearchButton}
      type="none"
      color={state.bgColor[nowPage] as ButtonColors}
      css={[
        tw`flex items-center justify-start text-black cursor-text w-[calc(100%-var(--contentX))] h-40 z-[10] m-2 rounded-3xl`,
        ,
        ` margin-right: ${nowPage === 'search' ? '0.45rem' : '0'};`,
      ]}
    >
      <div
        css={tw`p-2 cursor-pointer`}
        onClick={onClickSearchIcon}
      >
        <BiSearch className="text-2xl" />
      </div>
      <input
        type="text"
        value={inputVal}
        onChange={onChangeInput}
        ref={inputRef}
        css={tw`bg-transparent w-full h-full outline-none text-body1Bold`}
        placeholder={
          locationState.region
            ? state.placeHolders.place
            : state.placeHolders.region
        }
        onKeyUp={e => {
          if (e.key === 'Enter') {
            onKeydownInput && onKeydownInput(e);
          }
        }}
      />
    </Button>
  );
};

export default SearchButton;
