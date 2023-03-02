import {
  locationAtom,
  LocationNowPage,
  // SelectLocation,
} from '@src/recoil/location/atom';
import { useRecoilState } from 'recoil';
import { PlaceData } from '../react-query/usePlaceGetQuery';

const useLocationState = () => {
  const [locationState, setState] = useRecoilState(locationAtom);

  const setLocationState = (nowPage: LocationNowPage) => {
    console.log('func: ', nowPage);
    setState(prev => ({ ...prev, nowPage: nowPage }));
  };

  const setLocationRegion = (region: string) => {
    setState(prev => ({ ...prev, region: region }));
  };

  const setLocationPlace = (place: string) => {
    setState(prev => ({ ...prev, place: place }));
  };

  const setSelectData = (data: PlaceData) => {
    setState(prev => ({ ...prev, selectData: data }));
  };

  // const resetLocationState = () => {
  //   setState(prev => ({ nowPage: 'map', place: '', region: '' }));
  // };

  return {
    locationState,
    setLocationState,
    // resetLocationState,
    setLocationRegion,
    setLocationPlace,
    setSelectData,
  };
};

export default useLocationState;
