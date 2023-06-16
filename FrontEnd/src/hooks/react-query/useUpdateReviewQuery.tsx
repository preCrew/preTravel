import { RatingNum } from '@src/components/common/Rating';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export interface File {
  url: string;
  file: globalThis.File;
  key: string;
}

const updateReview = async (
  isRevisit: boolean,
  rating: RatingNum,
  textValue: string,
  imgFiles: File[],
  region: string,
) => {
  const form = new FormData();

  const dataSet = {
    isRevisit,
    rating,
    textValue,
    region,
  };

  form.append('data', JSON.stringify(dataSet));
  imgFiles.forEach(imgFile => {
    form.append('files', imgFile.file);
  });

  const data = await axios.post(`${process.env.SERVER_URL}/review/edit`, form);

  return data.data;
};

const useReviewUpdateQuery = (
  isRevisit: boolean,
  rating: RatingNum,
  textValue: string,
  imgFiles: File[],
  region: string,
) =>
  useMutation(() =>
    updateReview(isRevisit, rating, textValue, imgFiles, region),
  );

export default useReviewUpdateQuery;
