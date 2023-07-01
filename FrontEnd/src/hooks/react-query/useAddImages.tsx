import { Response } from '@src/hooks/react-query/responseInterfaces';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type BoardName = 'review' | 'schedule';

export interface File {
  idx: string;
  boardName: BoardName;
  boardIdx: string;
  fileDir: string;
  fileName: string;
  url: string;
}

interface MutationDTO {
  files: globalThis.File[];
  boardName: BoardName;
}

const uploadImage = (file: globalThis.File, boardName: BoardName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('boardName', boardName);
      const response = await axios.post<Response<Omit<File, 'url'>>>(
        `${process.env.REAL_SERVER_URL}/file`,
        form,
      );
      if (response.data.code !== 200) {
        reject(response);
      }

      const data = {
        ...response.data.data,
        url: URL.createObjectURL(file),
      };

      resolve(data);
    } catch (e) {
      console.log(e);
    }
  });
};

const uploadImages = async (files: globalThis.File[], boardName: BoardName) => {
  return new Promise(async resolve => {
    try {
      const promises = Array.from(files).map(file =>
        uploadImage(file, boardName),
      );

      const result = await Promise.allSettled(promises);
      const filterdData = result.filter(d => d.status === 'fulfilled');
      const data = filterdData.map(d => (d as { value: File }).value);

      resolve(data);
    } catch (e) {
      console.log(e);
    }
  });
};

const useAddImages = (onSuccess: (data: File[]) => void) =>
  useMutation({
    mutationFn: (mutationDto: MutationDTO) =>
      uploadImages(mutationDto.files, mutationDto.boardName),
    onSuccess: data => onSuccess(data as File[]),
  });

export default useAddImages;
