import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { File } from './useAddImages';
import { IReview } from './useGetReview';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@src/recoil/user/atom';

// memberIdx	String	회원 idx
const updateReview = async (
  queryClient: QueryClient,
  review: IReview,
  memberIdx: string,
  file: File[],
) => {
  try {
    console.log(review);
    const response = await axios.post(`${process.env.REAL_SERVER_URL}/review`, {
      memberIdx: memberIdx,
      name: review.name,
      address: review.address,
      star: review.star,
      latitude: review.latitude,
      longitude: review.longitude,
      revisit: review.revisit,
      contents: review.contents,
      idx: review.idx ?? '',
      file: file.map(f => f.idx.toString()),
    });
    if (response.data.code === 200) {
      queryClient.invalidateQueries(['useGetReviewByName', review.name]);
    }
    return response.data.data;
  } catch (e) {
    throw new Error('리뷰 업데이트에 실패했습니다.');
  }
};

const useReviewUpdateQuery = (review: IReview, file: File[]) => {
  const { id } = useRecoilValue(userAtom);
  const queryClient = useQueryClient();

  return useMutation(() => updateReview(queryClient, review, id, file));
};

export default useReviewUpdateQuery;
