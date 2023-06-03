import { useNavigate } from 'react-router-dom';

import useRegionGetQuery, {
  RegionData,
} from '@src/hooks/react-query/useGetRegionQuery';
import useLocationState from '@src/hooks/recoil/useLocationState';

import SearchTemplate from '../SearchTemplate';
import useSearchPageState from '@src/hooks/recoil/useSearchPageState';

const SearchRegion = () => {
  const navigate = useNavigate();
  const { setLocationRegion } = useLocationState();
  const { searchValue: inputValue, changeSearch } = useSearchPageState();

  return (
    <SearchTemplate
      searchButtonColor="gray2"
      searchButtonPlaceHolder="지역을 입력하세요"
      onClickBackButton={() => {
        navigate(-1);
      }}
      onClickListItem={async (data: unknown) => {
        const regionData = (await data) as RegionData;
        setLocationRegion(regionData.body);
        navigate('/schedulePlan');
      }}
      infiniteQuery={(value: string) => useRegionGetQuery(value)}
      inputValue={inputValue}
      onChange={changeSearch}
    />
  );
};

export default SearchRegion;
