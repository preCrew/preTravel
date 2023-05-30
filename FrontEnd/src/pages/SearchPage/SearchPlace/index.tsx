import { createSearchParams, useNavigate, useParams } from 'react-router-dom';

import useLocationState from '@src/hooks/recoil/useLocationState';
import usePlaceGetQuery, {
  PlaceData,
} from '@src/hooks/react-query/useGetPlaceQuery';

import SearchTemplate from '../SearchTemplate';
import { useEffect } from 'react';
import useSearchPageState from '@src/hooks/recoil/useSearchPageState';

interface SearchPlaceProps {
  // region: string;
}

const SearchPlace = () => {
  const navigate = useNavigate();

  const { region } = useParams();

  const { setSelectData } = useLocationState();

  const { searchValue: inputValue, changeSearch } = useSearchPageState();

  useEffect(() => {
    if (region === '') navigate('/');
  }, []);

  return (
    <SearchTemplate
      searchButtonColor="gray2"
      searchButtonPlaceHolder="장소를 입력하세요"
      onClickBackButton={() => {
        navigate(-1);
        // window.history.
      }}
      onClickListItem={async (data: unknown) => {
        const placeData = (await data) as PlaceData;
        const searchParam = createSearchParams({
          name: placeData.name,
          region: region ?? '',
          address: placeData.address,
          latitude: placeData.y,
          longitude: placeData.x,
        });
        setSelectData(placeData);
        navigate({
          pathname: '/map/info',
          search: `?${searchParam}`,
        });
      }}
      infiniteQuery={(place: string) => usePlaceGetQuery(region ?? '', place)}
      inputValue={inputValue}
      onChange={changeSearch}
    />
  );
};

export default SearchPlace;
