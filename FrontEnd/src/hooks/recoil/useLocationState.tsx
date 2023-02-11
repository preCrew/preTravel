import { locationAtom, LocationNowPage } from '@src/recoil/location/atom';
import { useRecoilState } from 'recoil';

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

  const resetLocationState = () => {
    setState(prev => ({ nowPage: 'map', place: '', region: '' }));
  };
  return {
    locationState,
    setLocationState,
    resetLocationState,
    setLocationRegion,
    setLocationPlace,
  };
};

export default useLocationState;
