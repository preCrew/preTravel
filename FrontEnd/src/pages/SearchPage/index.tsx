import {
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import SearchRegion from './SearchRegion';
import SearchPlace from './SearchPlace';
import { useEffect } from 'react';
import useSearchPageState from '@src/hooks/recoil/useSearchPageState';

interface SearchPageProps {}

const SearchPage = ({}: SearchPageProps) => {
  const navigationType = useNavigationType();
  const { resetSearchState } = useSearchPageState();

  useEffect(() => {
    console.log(navigationType);
    if (navigationType === 'PUSH') {
      resetSearchState();
    }
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="/region"
          element={<SearchRegion />}
        />
        <Route
          path="/place/:region"
          element={<SearchPlace />}
        />
        <Route
          path="*"
          element={<div>잘못된 접근</div>}
        />
      </Routes>
    </>
  );
};

export default SearchPage;
