import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import useLocationState from '@src/hooks/recoil/useLocationState';
import Button from '@src/components/common/Button';
import InputCalendar from '@src/components/common/Form/InputCalendar';
import InputField from '@src/components/common/Form/InputField';
import InputLabel from '@src/components/common/Form/InputLabel';
import InputPhoto from '@src/components/common/Form/InputPhoto';
import useInput from '@src/hooks/useInput';
import useAddScheduleImgQuery from '@src/hooks/react-query/useAddScheduleImgQuery';
import { scheduleFileAtom } from '@src/recoil/schedule/file/atom';
import useAddScheduleQuery from '@src/hooks/react-query/useAddSchedule';
import { scheduleAtom } from '@src/recoil/schedule/atom';
import TopBar from '@src/components/common/TobBar';
import { modalAtom } from '@src/recoil/modal/atom';
import tw from 'twin.macro';

////
const SchedulePlan = () => {
  const navigate = useNavigate();
  const [title, setTitle, onChangeTitle] = useInput('');
  const [range, setRange] = useState<any>();
  const [fieldCheck, setFieldCheck] = useState(false);

  const { mutate: submitMutate, isSuccess: isSuccessSubmit } =
    useAddScheduleQuery();
  const { mutate: imgUploadMutate } = useAddScheduleImgQuery();

  const { locationState } = useLocationState();
  const scheduleState = useRecoilValue(scheduleAtom);
  const file = useRecoilValue(scheduleFileAtom);
  const [isOpenState, setOpenState] = useRecoilState(modalAtom);

  const handleClickBackButton = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (isSuccessSubmit) navigate(`/mySchedule/${scheduleState.idx}`);
  }, [isSuccessSubmit]);

  useEffect(() => {
    setOpenState(false);
  }, []);

  useEffect(() => {
    if (!title && !range) {
      setFieldCheck(false);
    }
    if (title && range) {
      setFieldCheck(true);
    }
  }, [title, range]);

  const onChangeFile = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;

    const formData = new FormData();

    formData.append('file', target.files![0]);
    formData.append('boardName', 'schedule');

    for (let key of formData.keys()) {
      //console.log(key, ':', formData.get(key));
    }

    imgUploadMutate(formData);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fieldCheck) {
      //console.log('미작성', fieldCheck);
      return;
    }

    submitMutate({
      memberIdx: '12',
      name: title,
      city: locationState.region,
      startDate: moment(range?.from).format('YYYY-MM-DD'),
      endDate: moment(range?.to).format('YYYY-MM-DD'),
      file: file.idx + '',
    });
  };

  return (
    <article className="content-inner">
      <TopBar onClickBackButton={handleClickBackButton}></TopBar>
      <h2 className="mb-14 pt-12 text-2xl font-medium">
        {locationState.region}
      </h2>
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
            file={file}
          />
        </div>
        <Button
          type="large"
          className="mt-10"
          color={fieldCheck ? 'primary1' : 'gray1'}
        >
          등록
        </Button>
      </form>
    </article>
  );
};

export default SchedulePlan;
