import { useMutation } from '@tanstack/react-query';
import { Response } from './responseInterfaces';
import axios from 'axios';

const deleteImage = async (idx: string) => {
  console.log('idx: ', idx);
  try {
    const response = await axios.delete<Response<any>>(
      `${process.env.REAL_SERVER_URL}/file?idx=${idx}`,
    );
    if (response.data.code === 200) {
      return response.data.data;
    }
    throw new Error(response.data.msg);
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
  }
};

const useDeleteImage = () =>
  useMutation(['deleteImage'], {
    mutationFn: (idx: string) => deleteImage(idx),
  });

export default useDeleteImage;
