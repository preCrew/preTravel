import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import Button from '@src/components/common/Button';
import InputCalendar from '@src/components/common/Form/InputCalendar';
import InputField from '@src/components/common/Form/InputField';
import InputLabel from '@src/components/common/Form/InputLabel';
import InputPhoto from '@src/components/common/Form/InputPhoto';
import { fieldAtom } from '@src/recoil/form/atom';
import useInput from '@src/hooks/useInput';
import { locationAtom } from '@src/recoil/location/atom';
import TopBar from '@src/components/common/TobBar';
import InputSelect from '@src/components/common/Form/InputSelect';
import useAddPlaceinScehduleQuery from '@src/hooks/react-query/useAddPlaceinScehdule';
import { currentScheduleAtom } from '@src/recoil/date/atom';
import { selectedDayAtom } from '@src/recoil/date/atom';

//////
const PlacePlan = () => {
  const navigate = useNavigate();

  const { mutate } = useAddPlaceinScehduleQuery();

  const [currentScheduleState, setCurrentScheduleState] =
    useRecoilState(currentScheduleAtom);
  const currentPlaceState = useRecoilValue(locationAtom);
  const selectDayState = useRecoilValue(selectedDayAtom);
  // const onDragScheduleDataState = useRecoilValue(ondrag);

  const [fieldCheck, setFieldCheck] = useState(false);
  const [orderSelected, setOrderSelected] = useState('');

  useEffect(() => {
    //console.log(currentTravelInfoState, currentScheduleState);
    if (Number(orderSelected)) {
      setFieldCheck(true);
    } else {
      setFieldCheck(false);
    }
  }, [orderSelected]);

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderSelected(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const selectedDay: any = currentScheduleState.schedule.find(
    //   v => v.date === currentScheduleState.schedule[selectDayState].date,
    // );

    // const newDay = [
    //   ...selectedDay?.list,
    //   {
    //     placeName: currentPlaceState.selectData.body,
    //     address: currentPlaceState.selectData.address,
    //     order: orderSelected,
    //     la: currentPlaceState.selectData.y,
    //     lo: currentPlaceState.selectData.x,
    //   },
    // ];

    // const q = currentScheduleState.schedule.filter(
    //   (v, i) => i !== selectDayState,
    // );

    // const newSchedule = [
    //   {
    //     date: selectedDay.date,
    //     list: newDay,
    //   },
    //   ...q,
    // ];
    console.log(
      currentPlaceState,
      currentScheduleState.schedule[selectDayState].date,
    );

    if (fieldCheck) {
      // mutate(currentScheduleState);
      // navigate(
      //   `/map/mySchedule/12?=${currentScheduleState.schedule[selectDayState].date}`,
      // );
      mutate({
        date: currentScheduleState.schedule[selectDayState].date,
        sctIdx: currentScheduleState.idx,
        list: [
          {
            placeName: currentPlaceState.selectData.body,
            address: currentPlaceState.selectData.address,
            order: orderSelected,
            la: currentPlaceState.selectData.y,
            lo: currentPlaceState.selectData.x,
          },
        ],
      });
    }
  };

  return (
    <article className="content-inner">
      <TopBar>{currentPlaceState.selectData.name}</TopBar>
      <p>
        <b>{currentPlaceState.selectData.name}</b>
        <address>{currentPlaceState.selectData.address}</address>
      </p>
      <form onSubmit={onSubmit}>
        {/* <div className="mb-10">
          <InputLabel
            labelName="이 장소를 몇번째로 방문 할 예정인가요? (최대 장소 ??개)"
            necessary
          />
          <InputSelect onchange={onChangeSelect} />
        </div> */}

        <Button
          type="large"
          color="primary1"
        >
          등록
        </Button>
      </form>
    </article>
  );
};

export default PlacePlan;
