import React from 'react';
import { TbTrash } from 'react-icons/tb';
import { HiPencil } from 'react-icons/hi';

interface MyScheduleListEditProps {
  onClickDelete: () => void;
}

const MyScheduleListEdit = ({ onClickDelete }: MyScheduleListEditProps) => {
  const style = {
    color: 'var(--gray1)',
  };

  return (
    <div className="shrink-0">
      {/* <button type="button" onClick={onClickEdit} style={style} className='mr-2 border rounded-full w-25 h-25 border-gray5 color-primary5'><HiPencil className='m-auto'/></button> */}
      <button
        type="button"
        onClick={onClickDelete}
        style={style}
        className="h-25 w-25 rounded-full border border-gray5"
      >
        <TbTrash className="m-auto" />
      </button>
    </div>
  );
};

export default MyScheduleListEdit;
