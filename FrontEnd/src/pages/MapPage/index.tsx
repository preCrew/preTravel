import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Suspense, useMemo } from 'react';
import tw from 'twin.macro';

import SearchPage from '../SearchPage';
import MainPage from '../MainPage';
import KaKaoMap from './KaKaMap';
import useKakaoMap from '@src/components/common/Map/useKakaoMap';
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
        {/* <Route
          path="main"
          element={
            <Suspense fallback={<div>메인화면 로딩중...</div>}>
              <MainPage />
            </Suspense>
          }
        /> */}
        <Route
          path="search"
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
    </>
  );
};

export default MapPage;
