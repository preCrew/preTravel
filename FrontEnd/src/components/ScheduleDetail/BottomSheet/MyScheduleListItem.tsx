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
            className="mb-3 flex pl-7 text-body2"
            style={{
              backgroundColor: snap.isDragging
                ? 'var(--primary2)'
                : 'transparent',
              ...provided.draggableProps.style,
            }}
          >
            <span className="-ml-7 inline-block h-20 w-20 shrink-0 rounded-full bg-gray4 text-center text-body2Bold font-bold">
              {index + 1}
            </span>
            <div className="flex grow">
              <p className="grow break-words px-2">{data.placeName}</p>
              {edtiBtnOn && <MyScheduleListEditBtn />}
            </div>
          </li>
        )}
      </Draggable>
    </>
  );
};

export default MyScheduleListItem;
