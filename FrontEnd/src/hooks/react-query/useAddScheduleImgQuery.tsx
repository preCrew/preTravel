import { scheduleFileAtom } from '@src/recoil/schedule/file/atom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useSetRecoilState } from 'recoil';

const upload = async (data: FormData) => {
  try {
    const response = await axios.post(
      `${process.env.REAL_SERVER_URL}/file`,
      data,
      {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      },
    );

    return response.data.data;
  } catch (err) {
    throw err;
  }
};

const useAddScheduleImgQuery = () => {
  const setFileState = useSetRecoilState(scheduleFileAtom);

  return useMutation((data: FormData) => upload(data), {
    onSuccess: data => {
      setFileState(state => ({
        ...state,
        idx: data.idx,
        dir: data.fileDir,
      }));
    },
  });
};

export default useAddScheduleImgQuery;
