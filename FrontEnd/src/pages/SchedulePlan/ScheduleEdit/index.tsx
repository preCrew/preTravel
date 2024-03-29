import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
import { modalAtom } from '@src/recoil/modal/atom';
import useUpdateScheduleQuery from '@src/hooks/react-query/useUpdateSchedule';
import TopBar from '@src/components/common/TobBar';

////
const MyScheduleEdit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const scheduleData: any = state;
  const defaultRange = {
    from: scheduleData.startDate,
    to: scheduleData.endDate,
  };

  const [title, setTitle, onChangeTitle] = useInput(scheduleData.name || '');
  const [range, setRange] = useState<any>();
  const [fieldCheck, setFieldCheck] = useState(false);

  const { mutate: submitMutate, isLoading: isLoadingSubmit } =
    useUpdateScheduleQuery();
  const { mutate: imgUploadMutate } = useAddScheduleImgQuery();

  const setmodalOpen = useSetRecoilState(modalAtom);
  const { locationState } = useLocationState();
  const scheduleState = useRecoilValue(scheduleAtom);
  const [file, setFile] = useRecoilState(scheduleFileAtom);

  useEffect(() => {
    setmodalOpen(false);
  }, []);

  useEffect(() => {
    if (scheduleData.file.length) {
      setFile(state => ({
        idx: scheduleData.file[0].idx,
        dir: scheduleData.file[0].fileDir,
      }));
    }
  }, []);

  useEffect(() => {
    if (!title || !range) {
      setFieldCheck(false);
    }
    if (title || range) {
      setFieldCheck(true);
    }
  }, [title, range]);

  const handleClickBackButton = () => {
    navigate('/mySchedule');
  };

  const onChangeFile = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    console.log(event);
    const formData = new FormData();

    formData.append('file', target.files![0]);
    formData.append('boardName', 'schedule');

    imgUploadMutate(formData);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fieldCheck) {
      return;
    }
    console.log(scheduleData.file[0]?.idx || file?.idx + '');
    submitMutate({
      memberIdx: '12',
      idx: scheduleData.idx,
      name: title || scheduleData.name,
      city: scheduleData.city,
      startDate: range
        ? moment(range?.from).format('YYYY-MM-DD')
        : scheduleData.startDate,
      endDate: range
        ? moment(range?.to).format('YYYY-MM-DD')
        : scheduleData.endDate,
      file: scheduleData.file[0]?.idx || file?.idx + '',
    });

    if (!isLoadingSubmit) navigate(`/mySchedule`);
  };

  return (
    <article className="mt-16 content-inner">
      <TopBar onClickBackButton={handleClickBackButton}>
        {/* <h2 className="text-2xl font-medium mb-14">{locationState.region}</h2> */}
      </TopBar>
      <form onSubmit={onSubmit}>
        <div className="mb-10">
          <InputLabel
            labelName="일정 제목"
            necessary
          />
          <InputField
            defaultVal={scheduleData.name}
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
            <InputCalendar
              value={setRange}
              defaultRange={defaultRange}
            />
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
          수정
        </Button>
      </form>
    </article>
  );
};

export default MyScheduleEdit;
