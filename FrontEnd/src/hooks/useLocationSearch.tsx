import { useLocation } from 'react-router-dom';

const useLocationSearch = () => {
  const location = useLocation();
  const href = new URLSearchParams(location.search);
  const getQueryString = (key: string) => {
    return href.get(key);
  };
  return { getQueryString };
};
export default useLocationSearch;
