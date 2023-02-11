import tw from 'twin.macro';

import useLocationState from '@src/hooks/recoil/useLocationState';

import SearchButton from '@src/components/common/Button/SearchButton';
import useToast from '@src/hooks/useToast';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SearchPage from '@src/pages/SearchPage';
import { useEffect, useState } from 'react';

interface MapPageProps {}

const MapPage = ({}: MapPageProps) => {
  const { setLocationState, locationState } = useLocationState();
  const [toastMsg, setToastMsg] = useState('');
  const { Toast, showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    locationState.region && showToast();
  }, [locationState.region]);

  const handleClickSearchButton = () => {
    navigate('/map/search');
  };

  return (
    <div css={tw`w-full h-full flex flex-col items-center`}>
      <div css={tw`h-70 w-full flex justify-center items-center relative`}>
        <SearchButton
          nowPage={'map'}
          onClickSearchButton={handleClickSearchButton}
        />
      </div>
      <Toast />
      <Routes>
        <Route
          path="/search"
          element={<SearchPage />}
        />
      </Routes>
    </div>
  );
};

export default MapPage;
