import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import MyScheduleListItem from './MyScheduleListItem';
import { currentScheduleAtom, selectedDayAtom } from '@src/recoil/date/atom';
import { modalDragAtom } from '@src/recoil/modal/atom';
import { TCurrentplace, currentPlaceAtom } from '@src/recoil/place/atom';
import useAddPlaceinScehduleQuery from '@src/hooks/react-query/useAddPlaceinScehdule';

interface MyScheduleListProps {
  drag: boolean;
  setDrag: React.Dispatch<React.SetStateAction<boolean>>;
  edit: boolean;
  moreOnClick: boolean;
  setchangedOrderState: React.Dispatch<React.SetStateAction<any>>;
}

const MyScheduleList = ({
  drag,
  setDrag,
  edit,
  moreOnClick,
  setchangedOrderState,
}: MyScheduleListProps) => {
  const [placeDelete, setPlaceDelete] = useState(false);
  const [currentScheduleState, setCurrentScheduleState] =
    useRecoilState(currentScheduleAtom);
  const selectedDayState = useRecoilValue(selectedDayAtom);
  const modalDragOn = useRecoilValue(modalDragAtom);
  const selectDayState = useRecoilValue(selectedDayAtom);
  const [currentPlaceState, setCurrentPlaceState] =
    useRecoilState(currentPlaceAtom);
  const [onDragScheduleData, setonDragScheduleData] = useState([
    ...currentPlaceState.list,
  ]);

  const { mutate: mutateDeletePlace, isLoading: isLoadingAddPlace } =
    useAddPlaceinScehduleQuery();

  useEffect(() => {
    //장소 삭제
    if (placeDelete) mutateDeletePlace(currentPlaceState);
    setPlaceDelete(false);
  }, [currentPlaceState]);

  useEffect(() => {
    setonDragScheduleData(currentPlaceState.list);
  }, [selectedDayState, currentPlaceState.list]);

  // 순서 체인지후 정렬된 배열 state에 저장
  useEffect(() => {
    setchangedOrderState(onDragScheduleData);
  }, [onDragScheduleData]);

  const onDragStart = () => {
    setDrag(true);
  };

  const onDragEnd = (result: any, provided: any) => {
    if (!result.destination) {
      return;
    }
    // 재정렬
    const onDragScheduleDataCopy = [...onDragScheduleData];
    const [removed] = onDragScheduleDataCopy.splice(result.source.index, 1);
    //재정렬을 다시 배열에
    onDragScheduleDataCopy.splice(result.destination.index, 0, removed);
    setonDragScheduleData(onDragScheduleDataCopy);
    //console.log(onDragScheduleDataCopy,result)
    //console.log('끝')
    setDrag(false);
  };

  const onClickDelete = (index: number) => {
    //delete할 일정
    const copyPlaceList = [...currentPlaceState.list];
    const deletePlaceList = copyPlaceList.splice(index, 1);

    const deletedList = copyPlaceList.filter(
      list => list.order !== deletePlaceList[0].order,
    );
    // order 순차적으로 변경
    const newPlaceList = deletedList.map((place, idx) => ({
      ...place,
      order: (idx + 1).toString(),
    }));

    //recoil에 선저장
    setCurrentPlaceState((state: TCurrentplace) => ({
      date: currentScheduleState.schedule[selectDayState].date,
      sctIdx: currentScheduleState.idx + '',
      list: newPlaceList,
    }));

    setPlaceDelete(true);
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    >
      <Droppable droppableId="column1">
        {(provided, snap) => (
          <ul
            className={`${!modalDragOn ? `mt-4` : `mt-8`} ${
              moreOnClick && currentPlaceState.list.length > 5
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {onDragScheduleData.map((schdedule, i) => (
              <MyScheduleListItem
                data={schdedule}
                index={i}
                key={i}
                edit={edit}
                onClickDelete={() => onClickDelete(i)}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default MyScheduleList;
