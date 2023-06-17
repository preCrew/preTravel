import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import BottomSheetWrap from './BottomSheetWrap';
import Button from './Button';
import MyScheduleList from './MyScheduleList';
import { currentScheduleAtom, selectedDayAtom } from '@src/recoil/date/atom';
import { modalAtom, modalDragAtom } from '@src/recoil/modal/atom';
import withSelectedDay from '@src/recoil/date/withSelectedDay';
import useLocationState from '@src/hooks/recoil/useLocationState';
import {
  TCurrentplace,
  Tplace,
  currentPlaceAtom,
} from '@src/recoil/place/atom';
import useAddPlaceinScehduleQuery from '@src/hooks/react-query/useAddPlaceinScehdule';
interface TMyschedulConProps {
  id: string;
}

const MyScheduleCon = ({ id }: TMyschedulConProps) => {
  const [drag, setDrag] = useState(false);
  const [changedOrderState, setchangedOrderState] = useState([]);
  const [changeOrder, setChangeOrder] = useState(false);
  const [snap, setSnap] = useState(1);

  const { setLocationRegion, setSelectData } = useLocationState();
  const currentScheduleState = useRecoilValue(currentScheduleAtom);
  const withSelectedDayState = useRecoilValue(withSelectedDay);
  const [selectedDayState, setSelectedDayState] =
    useRecoilState(selectedDayAtom);
  const setmodalOpen = useSetRecoilState(modalAtom);
  const [currentPlaceState, setCurrentPlaceState] =
    useRecoilState(currentPlaceAtom);
  const [modalDragOn, setModalDraOn] = useRecoilState(modalDragAtom);
  const [edit, setEdit] = useState(false);
  const [moreOnClick, setMoreOnClick] = useState<boolean>(true);

  const { mutate: mutateOrderChagePlace, isLoading: isLoadingAddPlace } =
    useAddPlaceinScehduleQuery();

  const navigate = useNavigate();
  useEffect(() => {
    //console.log('편집', changedOrderState);
  });
  useEffect(() => {
    if (selectedDayState < 0) setSelectedDayState(0);
    setmodalOpen(true);
  }, []);

  useEffect(() => {
    //해당 날짜 일정 recoil 저장
    if (currentScheduleState.schedule[selectedDayState]?.list.length) {
      //기존 일정 idx빼고 order string 변환(일정추가시 요청 이슈로 인해..)
      const currentPlaceList = currentScheduleState.schedule[
        selectedDayState
      ]?.list?.map(({ idx, order, ...rest }) => ({
        ...rest,
        order: String(order),
      }));
      // recoil 저장
      setCurrentPlaceState((state: TCurrentplace) => ({
        ...state,
        list: currentPlaceList,
      }));
    }
  }, [selectedDayState, currentScheduleState]);

  useEffect(() => {
    //순서변경후 요청
    if (changeOrder) mutateOrderChagePlace(currentPlaceState);
    setChangeOrder(false);
  }, [currentPlaceState]);

  const onClickAddSchedule = async () => {
    setLocationRegion(currentScheduleState.city);
    navigate(`/search/place/${currentScheduleState.city}`);
  };

  const onClickEdit = () => {
    setEdit(true);
  };

  const onClickBack = () => {
    setEdit(false);
    setModalDraOn(true);
  };

  const onClickOrderChange = () => {
    setModalDraOn(false);
    setSnap(0);
  };

  const onClickOrderChangeSubmit = () => {
    setModalDraOn(true);

    const copyPlaceList: Tplace[] = [...changedOrderState];
    // order 순차적으로 변경
    const newPlaceList = copyPlaceList.map((place, idx) => ({
      ...place,
      order: (idx + 1).toString(),
    }));

    // recoil에 선저장
    setCurrentPlaceState((state: TCurrentplace) => ({
      date: currentScheduleState.schedule[selectedDayState]?.date,
      sctIdx: currentScheduleState.idx + '',
      list: newPlaceList,
    }));
    setChangeOrder(true);
  };

  return (
    <BottomSheetWrap
      drag={drag}
      moreOnClick={moreOnClick}
      setMoreOnClick={setMoreOnClick}
      snapIndex={snap}
    >
      <div className="flex justify-between">
        <h4 className="flex items-end text-body1Bold">
          {currentScheduleState.schedule[selectedDayState]?.date}
          <sub className="ml-2 rounded bg-gray4 p-1 text-body4Bold text-primary1">
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
                {/*순서변경 시*/}
                <Button
                  onClick={onClickBack}
                  name="취소"
                />
                <Button
                  onClick={onClickOrderChangeSubmit}
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
        moreOnClick={moreOnClick}
        setchangedOrderState={setchangedOrderState}
      />
    </BottomSheetWrap>
  );
};

export default MyScheduleCon;
