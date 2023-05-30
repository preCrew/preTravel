import { RatingNum } from '@src/components/common/Rating';
import { LocationAtom } from '@src/recoil/location/atom';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useLocationState from '../recoil/useLocationState';
import { File } from './useAddImages';

const updateReview = async (
  isRevisit: boolean,
  rating: RatingNum,
  textValue: string,
  locationState: LocationAtom,
  imgFiles?: File[],
  reviewIdx?: string,
  queryClient?: QueryClient,
) => {
  try {
    const response = await axios.post(`${process.env.REAL_SERVER_URL}/review`, {
      memberIdx: '1',
      name: locationState.selectData.name,
      address: locationState.selectData.address,
      star: rating.toString(),
      latitude: locationState.selectData.y,
      longitude: locationState.selectData.x,
      revisit: isRevisit.toString(),
      contents: textValue,
      idx: reviewIdx || '',
      file: imgFiles?.map(file => file.idx.toString()),
    });
    if (response.data.code === 200) {
      console.log(reviewIdx, response);
      queryClient?.invalidateQueries(['review', reviewIdx]);
    }
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
  const queryClient = useQueryClient();

  return useMutation(() =>
    updateReview(
      isRevisit,
      rating,
      textValue,
      locationState,
      imgFiles,
      reviewIdx,
      queryClient,
    ),
  );
};

export default useReviewUpdateQuery;
