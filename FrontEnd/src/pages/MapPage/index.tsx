import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import tw from 'twin.macro';

import useToast from '@src/hooks/useToast';

import SearchButton from '@src/components/common/Button/SearchButton';
import SearchPage from '@src/pages/SearchPage';
import MapInfoPage from '../MapInfoPage';

interface MapPageProps {}

const MapPage = ({}: MapPageProps) => {
  const { Toast } = useToast();
  const [isShowSearchButton, setIsShowSearchButton] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const href = new URLSearchParams(location.search);
    const isShowButton = href.get('showButton');
    setIsShowSearchButton(isShowButton === 'false' ? false : true);
  }, [location.search]);

  const handleClickSearchButton = () => {
    navigate('/map/search');
  };

  return (
    <div css={tw`w-full h-full flex flex-col items-center`}>
      {isShowSearchButton && (
        <div css={tw`h-70 w-full flex justify-center items-center relative`}>
          <SearchButton
            nowPage={'map'}
            onClickSearchButton={handleClickSearchButton}
            css={tw`z-[15]`}
          />
        </div>
      )}

      <Toast />
      <Routes>
        <Route
          path="/search"
          element={<SearchPage />}
        />
        <Route
          path="/info"
          element={
            <Suspense>
              <MapInfoPage />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default MapPage;
