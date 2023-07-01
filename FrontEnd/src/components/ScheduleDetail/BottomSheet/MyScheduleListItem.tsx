import { modalDragAtom } from '@src/recoil/modal/atom';
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useRecoilValue } from 'recoil';
import MyScheduleListEditBtn from './MyScheduleListEditBtn';

interface MyScheduleListItemProps {
  data: any;
  index: number;
  edit: boolean;
  onClickDelete: () => void;
}

const MyScheduleListItem = ({
  data,
  index,
  edit,
  onClickDelete,
}: MyScheduleListItemProps) => {
  const modalDragOn = useRecoilValue(modalDragAtom);
  const edtiBtnOn = edit && modalDragOn;

  return (
    <>
      <Draggable
        key={data.order * 1}
        draggableId={data.order}
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
              color: snap.isDragging ? 'white' : 'black',
              backgroundColor: snap.isDragging
                ? 'var(--primary1)'
                : 'transparent',
              ...provided.draggableProps.style,
            }}
          >
            <span className="inline-block w-20 h-20 font-bold text-center text-black rounded-full -ml-7 shrink-0 bg-gray4 text-body2Bold">
              {index + 1}
            </span>
            <div className="flex grow">
              <p className="px-2 break-words grow">{data.placeName}</p>
              {edtiBtnOn && (
                <MyScheduleListEditBtn onClickDelete={onClickDelete} />
              )}
            </div>
          </li>
        )}
      </Draggable>
    </>
  );
};

export default MyScheduleListItem;
