import { useNavigate } from 'react-router-dom';

import SearchOvelay from '@src/components/Ovelays/SeaechOvelay';
import useLocationState from '@src/hooks/recoil/useLocationState';
import useRegionGetQuery, {
  RegionData,
} from '@src/hooks/react-query/useGetRegionQuery';
import useOvelay from '../useOvelay';

const useSearchRegionOvelay = () => {
  const navigate = useNavigate();
  const ovelay = useOvelay();
  const { setLocationRegion } = useLocationState();

  return {
    open: () =>
      new Promise((resolve, reject) =>
        ovelay.open(({ close }) => (
          <SearchOvelay
            searchButtonColor="gray2"
            searchButtonPlaceHolder="지역을 입력하세요"
            onClickBackButton={() => {
              close();
              resolve('close');
            }}
            onClickListItem={async (data: unknown) => {
              const regionData = (await data) as RegionData;
              setLocationRegion(regionData.body);
              navigate('/schedulePlan');
              close();
              resolve('close');
            }}
            infiniteQuery={(value: string) => useRegionGetQuery(value)}
          />
        )),
      ),
    close: () => ovelay.close(),
  };
};

export default useSearchRegionOvelay;
