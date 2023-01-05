import BottomSheet from '@src/components/BottomSheet';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Button from './Button';
import MyScheduleListItem from './MyScheduleListItem';
import { data } from './data';

interface MyScheduleListProps {
  drag: boolean;
  setDrag: React.Dispatch<React.SetStateAction<boolean>>;
  edit: boolean;
}

const MyScheduleList = ({ drag, setDrag, edit }: MyScheduleListProps) => {
  const [myschedulData, setmySchedulData] = useState(data.schedule[0].list);

  const onDragStart = () => {
    setDrag(true);
  };

  const onDragEnd = (result: any, provided: any) => {
    if (!result.destination) {
      return;
    }

    // 재정렬
    const myschedulDataCopy = [...myschedulData];
    const [removed] = myschedulDataCopy.splice(result.source.index, 1);
    // 재정렬을 다시 배열에
    myschedulDataCopy.splice(result.destination.index, 0, removed);
    setmySchedulData(myschedulDataCopy);
    //console.log(myschedulDataCopy,result)
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
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {myschedulData.map((it, i) => (
              <MyScheduleListItem
                data={it}
                index={i}
                key={it.order}
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
