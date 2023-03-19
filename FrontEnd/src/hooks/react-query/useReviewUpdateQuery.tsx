import { RatingNum } from '@src/components/common/Rating';
import { LocationAtom } from '@src/recoil/location/atom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useLocationState from '../recoil/useLocationState';

export interface File {
  url: string;
  file: globalThis.File;
  key: string;
}

const updateReview = async (
  isRevisit: boolean,
  rating: RatingNum,
  textValue: string,
  locationState: LocationAtom,
  imgFiles?: File[],
  reviewIdx?: string,
) =>
  await axios.post(`http://192.168.0.40:8080/review`, {
    memberIdx: 101,
    name: locationState.selectData.name,
    address: locationState.selectData.address,
    star: rating,
    latitude: parseFloat(locationState.selectData.y),
    longitude: parseFloat(locationState.selectData.x),
    revisit: isRevisit,
    contents: textValue,
    idx: reviewIdx,
  });

const useReviewUpdateQuery = (
  isRevisit: boolean,
  rating: RatingNum,
  textValue: string,
  imgFiles?: File[],
  reviewIdx?: string,
) => {
  const { locationState } = useLocationState();
  return useMutation(() =>
    updateReview(
      isRevisit,
      rating,
      textValue,
      locationState,
      imgFiles,
      reviewIdx,
    ),
  );
};

export default useReviewUpdateQuery;
