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
) => {
  const form = new FormData();
  form.append('memberIdx', '101');
  form.append('name', locationState.selectData.name);
  form.append('address', locationState.selectData.address);
  form.append('star', rating.toString());
  form.append('latitude', locationState.selectData.y);
  form.append('longitude', locationState.selectData.x);
  form.append('revisit', isRevisit.toString());
  form.append('contents', textValue);
  form.append('idx', reviewIdx || '');

  // const response = await axios.post(`${process.env.REAL_SERVER_URL}/review`, {
  //   memberIdx: 101,
  //   name: locationState.selectData.name,
  //   address: locationState.selectData.address,
  //   star: rating,
  //   latitude: parseFloat(locationState.selectData.y),
  //   longitude: parseFloat(locationState.selectData.x),
  //   revisit: isRevisit,
  //   contents: textValue,
  //   idx: reviewIdx,
  // });
  try {
    const response = await axios.post(
      `${process.env.REAL_SERVER_URL}/review`,
      form,
    );
    return response.data.data;
  } catch (e) {
    throw new Error('리뷰 업데이트에 실패했습니다.');
  }
};

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
