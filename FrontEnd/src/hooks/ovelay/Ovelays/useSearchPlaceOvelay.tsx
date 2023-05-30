import { To, createSearchParams, useNavigate } from 'react-router-dom';

import SearchOvelay from '@src/components/Ovelays/SeaechOvelay';
import useLocationState from '@src/hooks/recoil/useLocationState';
import useOvelay from '../useOvelay';
import usePlaceGetQuery, {
  PlaceData,
} from '@src/hooks/react-query/useGetPlaceQuery';

const useSearchPlaceOvelay = (region: string) => {
  const navigate = useNavigate();
  const ovelay = useOvelay();
  const { setSelectData, locationState } = useLocationState();

  return {
    open: () =>
      new Promise((resolve, reject) =>
        ovelay.open(({ close }) => (
          <SearchOvelay
            searchButtonColor="gray2"
            searchButtonPlaceHolder="장소를 입력하세요"
            onClickBackButton={() => {
              close();
              resolve('close');
            }}
            onClickListItem={async (data: unknown) => {
              const placeData = (await data) as PlaceData;
              const searchParam = createSearchParams({
                name: placeData.name,
                region,
                address: placeData.address,
                latitude: placeData.y,
                longitude: placeData.x,
              });
              setSelectData(placeData);
              navigate({
                pathname: '/map/info',
                search: `?${searchParam}`,
              });
              close();
              resolve('close');
            }}
            infiniteQuery={(place: string) => usePlaceGetQuery(region, place)}
          />
        )),
      ),
    close: () => ovelay.close(),
  };
};

export default useSearchPlaceOvelay;

// const placeData = (await data) as PlaceData;
