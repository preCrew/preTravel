import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Suspense, useMemo } from 'react';
import tw from 'twin.macro';

import useToast from '@src/hooks/useToast';

import SearchButton from '@src/components/common/Button/SearchButton';
import SearchPage from '@src/pages/SearchPage';
import MapInfoPage from '../MapInfoPage';

interface State {
  name?: string;
  address: string;
  latitude: string;
  longitude: string;
  showButton: boolean;
}
interface MapPageProps {}

const MapPage = ({}: MapPageProps) => {
  const { Toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchParamsObj = Object.fromEntries(searchParams);
  const showButton = useMemo(
    () =>
      searchParamsObj['showButton']
        ? searchParamsObj['showButton'] === 'true'
        : true,
    [searchParamsObj['showButton']],
  );

  const handleClickSearchButton = () => {
    navigate('/map/search');
  };

  return (
    <div css={tw`w-full h-full flex flex-col items-center`}>
      {showButton && (
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
