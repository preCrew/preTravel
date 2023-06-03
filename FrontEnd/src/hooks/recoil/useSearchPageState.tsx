import searchPageAtom from '@src/recoil/searchPage/atom';
import { useRecoilState } from 'recoil';

const useSearchPageState = () => {
  const [state, setState] = useRecoilState(searchPageAtom);

  const changeSearch = (search: string) => {
    setState({
      ...state,
      searchValue: search,
    });
  };

  const resetSearchState = () => {
    setState({
      ...state,
      searchValue: '',
    });
  };

  return { searchValue: state.searchValue, resetSearchState, changeSearch };
};

export default useSearchPageState;
