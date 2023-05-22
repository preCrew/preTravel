import React from 'react';
import { TbTrash } from "react-icons/tb";
import { HiPencil } from "react-icons/hi";

const MyScheduleListEdit = () => {

    const onClickEdit = () => {

    }

    const onClickDelete = () => {

    }

    const style = {
        color: 'var(--gray1)',
    };

    return (
        <div className='shrink-0'>
            <button type="button" onClick={onClickEdit} style={style} className='mr-2 border rounded-full w-25 h-25 border-gray5 color-primary5'><HiPencil className='m-auto'/></button>
            <button type="button" onClick={onClickDelete} style={style} className='border rounded-full w-25 h-25 border-gray5'><TbTrash className='m-auto'/></button>
        </div>
    );
};

export default MyScheduleListEdit;