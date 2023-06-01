import { Suspense, useContext, useEffect, useRef, useState } from 'react';
import tw from 'twin.macro';

import { SearchOvelayInfinityQuery } from '@src/components/common/AsyncDataList';

import { ButtonColors } from '@src/components/common/Button';
import LoadingData from '@src/components/common/AsyncDataList/LoadingData';
import AsyncDataList from '@src/components/common/AsyncDataList';
import SearchButton from '@src/components/common/Button/SearchButton';
import TopBar from '@src/components/common/TobBar';

import {} from 'history';
import { NavigationContext } from 'react-day-picker';
import { useLocation } from 'react-router-dom';
import useLocationSearch from '@src/hooks/useLocationSearch';

interface SearchTemplateProps {
  searchButtonColor: ButtonColors;
  searchButtonPlaceHolder: string;
  onClickBackButton: () => void;
  onClickListItem: (data: unknown) => Promise<void>;
  onSubmit?: () => void;
  infiniteQuery: SearchOvelayInfinityQuery;
  inputValue: string;
  onChange: (region: string) => void;
}

const SearchTemplate = ({
  searchButtonColor,
  searchButtonPlaceHolder,
  onClickBackButton,
  onClickListItem,
  onSubmit,
  infiniteQuery,
  inputValue,
  onChange,
}: SearchTemplateProps) => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const searchButtonRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchButtonRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    onSubmit?.();
    setIsSubmit(true);
    searchButtonRef.current?.blur();
  };

  const handleClickItem = async (data: unknown) => {
    onClickListItem(data);
    setIsSubmit(false);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsSubmit(false);
  };

  return (
    <div css={tw`absolute top-0 z-[500] w-full h-full bg-white`}>
      <TopBar onClickBackButton={onClickBackButton}>
        <SearchButton
          bgColor={searchButtonColor}
          placeHolder={searchButtonPlaceHolder}
          inputRef={searchButtonRef}
          onChangeInput={handleChangeInput}
          inputVal={inputValue}
          onSubmit={handleSubmit}
        />
      </TopBar>
      <Suspense fallback={<LoadingData />}>
        <AsyncDataList
          infiniteQuery={infiniteQuery}
          isSubmit={isSubmit}
          onClickListItem={handleClickItem}
          searchValue={inputValue}
        />
      </Suspense>
    </div>
  );
};

export default SearchTemplate;
