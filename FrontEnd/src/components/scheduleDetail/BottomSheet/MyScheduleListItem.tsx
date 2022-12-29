import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import MyScheduleListEditBtn from "./MyScheduleListEditBtn";

interface MyScheduleListItemProps {
    data: {
        id: string,
        title: string,
        order: number,
    },
    index:number,
    edit:boolean,
}

const MyScheduleListItem = ({data,index,edit}: MyScheduleListItemProps) => {

    return (
        <>
            <Draggable
                key={data.id}
                draggableId={data.id}
                index={index}
                isDragDisabled={true}
            >
                {(provided, snap) => (
                    <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex pl-8 mb-3 text-body2"
                        style={{
                            backgroundColor: snap.isDragging
                                ? "#4fe"
                                : "pink",

                            ...provided.draggableProps.style
                        }}
                    >
                        <span className="inline-block w-20 h-20 font-bold text-center rounded-full shrink-0 bg-gray4 text-body2Bold -ml-7">{index + 1}</span>
                        <div className="flex grow">
                            <p className="px-2 break-words grow">{data.title}</p>
                            {edit && <MyScheduleListEditBtn />}
                        </div>
                    </li>
                )}
            </Draggable>
        </>
    )
}

export default MyScheduleListItem;