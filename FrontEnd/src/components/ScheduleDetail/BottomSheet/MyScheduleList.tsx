import BottomSheet from '@src/components/BottomSheet';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Button from './Button';
import MyScheduleListItem from './MyScheduleListItem';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentScheduleAtom, selectedDayAtom } from '@src/recoil/date/atom';
import { modalDragAtom } from '@src/recoil/modal/atom';
import { currentPlaceAtom } from '@src/recoil/place/atom';

interface MyScheduleListProps {
  drag: boolean;
  setDrag: React.Dispatch<React.SetStateAction<boolean>>;
  edit: boolean;
  moreOnClick: boolean;
}

const MyScheduleList = ({
  drag,
  setDrag,
  edit,
  moreOnClick,
}: MyScheduleListProps) => {
  const currentScheduleState = useRecoilValue(currentScheduleAtom);
  const selectedDayState = useRecoilValue(selectedDayAtom);
  const modalDragOn = useRecoilValue(modalDragAtom);
  const currentPlaceState = useRecoilValue(currentPlaceAtom);
  const [onDragScheduleData, setonDragScheduleData] = useState([
    ...currentScheduleState.schedule[selectedDayState]?.list,
  ]);

  useEffect(() => {
    let listStyle;
    if (currentPlaceState.list.length > 5) {
    }
  }, []);

  useEffect(() => {
    setonDragScheduleData(currentScheduleState.schedule[selectedDayState].list);
  }, [selectedDayState, currentPlaceState]);

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

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    >
      <Droppable droppableId="column1">
        {(provided, snap) => (
          <ul
            className={`${!modalDragOn ? `mt-4` : `mt-8`} ${
              moreOnClick &&
              currentPlaceState.list.length > 5 &&
              `max-h-[20%] overflow-hidden`
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
