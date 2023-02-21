import { Suspense, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import useOnChange from '@src/hooks/useOnChange';

import useLocationState from '../../hooks/recoil/useLocationState';

import TopBar from '@src/components/common/TobBar';
import SearchButton from '@src/components/common/Button/SearchButton';
import RegionPlaceList from '@src/components/RegionPlaceList';

interface SearchPageProps {}
const SearchPage = ({}: SearchPageProps) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const { value: inputVal, onChange: onChangeInput } = useOnChange();
  const [isCommit, setIsCommit] = useState(false);

  const { setLocationRegion, setLocationState } = useLocationState();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleClickBackButton = () => {
    navigate(-1);
    setLocationState('map');
    setLocationRegion('');
  };

  const handleSubmit = () => {
    inputRef.current?.blur();
  };

  return (
    <div css={tw`w-full h-full absolute z-10 top-0 bg-white`}>
      <TopBar onClickBackButton={handleClickBackButton}>
        <SearchButton
          nowPage={'search'}
          inputRef={inputRef}
          onChangeInput={onChangeInput}
          inputVal={inputVal}
          onSubmit={handleSubmit}
          setIsCommit={setIsCommit}
        />
      </TopBar>
      <Suspense fallback={<div>loading...</div>}>
        <RegionPlaceList
          inputRef={inputRef}
          inputVal={inputVal}
          isCommit={isCommit}
          setIsCommit={setIsCommit}
        />
      </Suspense>
    </div>
  );
};

export default SearchPage;
