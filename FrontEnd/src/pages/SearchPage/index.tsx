import { Suspense, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import useOnChange from '@src/hooks/useOnChange';

import useLocationState from '../../hooks/recoil/useLocationState';

import TopBar from '@src/components/common/TobBar';
import SearchButton from '@src/components/common/Button/SearchButton';
import RegionPlaceList from '@src/components/RegionPlaceList';
import LoadingData from '@src/components/common/DataList/LoadingData';

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
    navigate('/');
    setLocationState('map');
    setLocationRegion('');
  };

  const handleSubmit = () => {
    inputRef.current?.blur();
    setIsCommit(true);
  };

  return (
    <div css={tw`absolute top-0 z-20 w-full h-full bg-white`}>
      <TopBar onClickBackButton={handleClickBackButton}>
        <SearchButton
          nowPage={'search'}
          inputRef={inputRef}
          onChangeInput={onChangeInput}
          inputVal={inputVal}
          onSubmit={handleSubmit}
        />
      </TopBar>
      <Suspense fallback={<LoadingData />}>
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
