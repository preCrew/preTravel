import React, { useEffect, useState } from 'react';

import Button from '@src/components/common/Button';
import InputCalendar from '@src/components/common/Form/InputCalendar';
import InputField from '@src/components/common/Form/InputField';
import InputLabel from '@src/components/common/Form/InputLabel';
import InputPhoto from '@src/components/common/Form/InputPhoto';
import { fieldAtom } from '@src/recoil/form/atom';
import useInput from '@src/hooks/useInput';

import { Blob } from 'buffer';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

async function imageUpload(url: string) {
  const response = await fetch('http://localhost:8000/posts/image');
}
interface Employee {
  title: string;
  range: string[];
}
const schedulePlanAdd = async (data: Employee) => {
  console.log(data);
  const { data: response } = await axios.post('http://localhost:3002/posts', {
    data,
  });
  return response.data;
};

//////
const schedulePlan = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(schedulePlanAdd, {
    onSuccess: data => {
      console.log(data);
    },
    onError: () => {
      console.log('error');
    },
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });

  const [title, setTitle, onChangeTitle] = useInput('');
  const [range, setRange] = useState();
  const [file, setFile] = useState('');
  const [fieldCheck, setFieldCheck] = useState(false);
  const [previewURL, setPreviewURL] = useState('');

  useEffect(() => {
    if (!title && !range) {
      setFieldCheck(false);
    }
    if (title && range) {
      setFieldCheck(true);
    }
    console.log(title, range);
  }, [title, range]);

  const onChangeFile = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    console.log(target.files?.[0].name);

    const formData = new FormData();
    formData.append('fileupload', target.files![0].name);
    setFile(target.files![0].name);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fieldCheck) {
      console.log('미작성', fieldCheck);
      return;
    }

    const testRange = ['202', '222'];
    mutate({ title, range: testRange });
  };

  return (
    <article className="content-inner">
      <form onSubmit={onSubmit}>
        <div className="mb-10">
          <InputLabel
            labelName="일정 제목"
            necessary
          />
          <InputField
            onChange={onChangeTitle}
            value={title}
          />
        </div>
        <div className="mb-10">
          <InputLabel
            labelName="일정 기간"
            necessary
          />
          <InputField fieldType="calendar">
            <InputCalendar value={setRange} />
          </InputField>
        </div>
        <div>
          <InputLabel
            necessary={false}
            labelName="일정 사진"
          />
          <p className="mb-4 text-body3 text-gray1">
            이 여행 일정에 사용할 대표사진을 업로드 해주세요.
          </p>
          <InputPhoto
            onChange={onChangeFile}
            fileName={file}
          />
        </div>
        <Button
          sizeType="large"
          color={fieldCheck ? 'blue' : 'grey'}
        >
          등록
        </Button>
      </form>
    </article>
  );
};

export default schedulePlan;
