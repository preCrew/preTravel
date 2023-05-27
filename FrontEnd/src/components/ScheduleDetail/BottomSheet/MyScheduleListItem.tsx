import { modalDragAtom } from '@src/recoil/modal/atom';
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useRecoilValue } from 'recoil';
import MyScheduleListEditBtn from './MyScheduleListEditBtn';

interface MyScheduleListItemProps {
  data: {
    id: string | number;
    placeName: string;
    order: number;
  };
  index: number;
  edit: boolean;
}

const MyScheduleListItem = ({ data, index, edit }: MyScheduleListItemProps) => {
  const modalDragOn = useRecoilValue(modalDragAtom);
  const edtiBtnOn = edit && modalDragOn;

  return (
    <>
      <Draggable
        key={data.order}
        draggableId={data.id + ''}
        index={index}
        isDragDisabled={modalDragOn}
      >
        {(provided, snap) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="flex mb-3 pl-7 text-body2"
            style={{
              backgroundColor: snap.isDragging
                ? 'var(--primary2)'
                : 'transparent',
              ...provided.draggableProps.style,
            }}
          >
            <span className="inline-block w-20 h-20 font-bold text-center rounded-full shrink-0 bg-gray4 text-body2Bold -ml-7">
              {index + 1}
            </span>
            <div className="flex grow">
              <p className="px-2 break-words grow">{data.placeName}</p>
              {edtiBtnOn && <MyScheduleListEditBtn />}
            </div>
          </li>
        )}
      </Draggable>
    </>
  );
};

export default MyScheduleListItem;
