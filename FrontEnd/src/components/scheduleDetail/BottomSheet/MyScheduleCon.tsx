import BottomSheet from '@src/components/BottomSheet';
import React, { useState } from 'react';
import BottomSheetWrap from './BottomSheetWrap';
import Button from './Button';
import MyScheduleList from './MyScheduleList';
import { data } from './data';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import dateAtom from '@src/recoil/date/atom';
import { modalDragAtom } from '@src/recoil/modal/atom';

const MyScheduleCon = () => {
  const [drag, setDrag] = useState(false);
  const { selectedDayDiff } = useRecoilValue(dateAtom);
  const [myschedulData, setmySchedulData] = useState(
    data.schedule[selectedDayDiff],
  );

  const onClickAddSchedule = () => {
    console.log(1);
  };

  const [edit, setEdit] = useState(false);
  const onClickEdit = () => {
    console.log(1);
    setEdit(true);
  };

  const onClickBack = () => {
    setEdit(false);
  };

  const [modalDragOn, setModalDraOn] = useRecoilState(modalDragAtom);
  const onClickOrderChange = () => {
    setModalDraOn(false);
  };

  const onClickEditSubmit = () => {
    setModalDraOn(true);
  };

  return (
    <BottomSheetWrap drag={drag}>
      <div className="flex justify-between">
        <h4 className="flex items-end mb-8 text-body1Bold">
          {myschedulData.date}
          <sub className="p-1 ml-2 rounded bg-gray4 text-body4Bold text-primary1">
            1일차
          </sub>
        </h4>
        <div className="[&>button+button]:ml-2">
          {edit ? (
            modalDragOn ? (
              <>
                <Button
                  onClick={onClickBack}
                  name="취소"
                />
                <Button
                  onClick={onClickOrderChange}
                  name="순서변경"
                />
                <Button
                  onClick={onClickEditSubmit}
                  name="완료"
                  submitColor={true}
                />
              </>
            ) : (
              <>
                <Button
                  onClick={onClickBack}
                  name="취소"
                />
                <Button
                  onClick={onClickEditSubmit}
                  name="완료"
                  submitColor={true}
                />
              </>
            )
          ) : (
            <>
              <Button
                onClick={onClickEdit}
                name="목록편집"
              />
              <Button
                onClick={onClickAddSchedule}
                name="일정추가"
                submitColor={true}
              />
            </>
          )}
        </div>
      </div>
      <MyScheduleList
        drag={drag}
        setDrag={setDrag}
        edit={edit}
      />
    </BottomSheetWrap>
  );
};

export default MyScheduleCon;
