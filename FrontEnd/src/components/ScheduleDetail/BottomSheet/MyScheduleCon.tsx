import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import BottomSheetWrap from './BottomSheetWrap';
import Button from './Button';
import MyScheduleList from './MyScheduleList';
import { currentScheduleAtom, selectedDayAtom } from '@src/recoil/date/atom';
import { modalAtom, modalDragAtom } from '@src/recoil/modal/atom';
import withSelectedDay from '@src/recoil/date/withSelectedDay';
import useLocationState from '@src/hooks/recoil/useLocationState';

const MyScheduleCon = ({ region }: any) => {
  const [drag, setDrag] = useState(false);

  const { setLocationRegion, setSelectData } = useLocationState();
  const currentScheduleState = useRecoilValue(currentScheduleAtom);
  const withSelectedDayState = useRecoilValue(withSelectedDay);
  const [selectedDayState, setSelectedDayState] =
    useRecoilState(selectedDayAtom);
  const setmodalOpen = useSetRecoilState(modalAtom);
  const [modalDragOn, setModalDraOn] = useRecoilState(modalDragAtom);
  const [edit, setEdit] = useState(false);
  const edtiBtnOn = edit && modalDragOn;

  const navigate = useNavigate();

  useEffect(() => {
    setSelectedDayState(0);
    setmodalOpen(true);
  }, []);

  const onClickAddSchedule = () => {
    setLocationRegion(region);
    navigate('/search');
  };

  const onClickEdit = () => {
    console.log(1);
    setEdit(true);
  };

  const onClickBack = () => {
    setEdit(false);
    setModalDraOn(true);
  };

  const onClickOrderChange = () => {
    setModalDraOn(false);
  };

  const onClickEditSubmit = () => {
    setModalDraOn(true);
  };

  return (
    <BottomSheetWrap drag={drag}>
      <div className="flex justify-between">
        <h4 className="flex items-end text-body1Bold">
          {currentScheduleState.schedule[selectedDayState]?.date}
          <sub className="p-1 ml-2 rounded bg-gray4 text-body4Bold text-primary1">
            {withSelectedDayState}일차
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
                  submitColor={true}
                />
                {/* <Button
                  onClick={onClickEditSubmit}
                  name="완료"
                  submitColor={true}
                /> */}
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
      {!modalDragOn && (
        <p className="mt-2 text-body4Bold text-gray1">
          순서를 변경하고 싶은 목록을 드래그 하세요.
        </p>
      )}

      <MyScheduleList
        drag={drag}
        setDrag={setDrag}
        edit={edit}
      />
    </BottomSheetWrap>
  );
};

export default MyScheduleCon;
