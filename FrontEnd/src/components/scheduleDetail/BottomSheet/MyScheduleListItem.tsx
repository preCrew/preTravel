import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

interface MyScheduleListItemProps {
    data: {
        id: string,
        title: string,
        order: number,
    },
    index:number
}

const MyScheduleListItem = ({data,index}: MyScheduleListItemProps) => {

    return (
        <>
            <Draggable
                key={data.id}
                draggableId={data.id}
                index={index}
            >
                {(provided, snap) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="pl-8 list-item text-body1"
                        style={{
                            backgroundColor: snap.isDragging
                                ? "#4fe"
                                : "pink",

                            ...provided.draggableProps.style
                        }}
                    >
                        <span className="inline-block w-20 h-20 font-bold text-center rounded-full bg-gray4 text-body1Bold mr-2.5 -ml-7">{index + 1}</span>
                        {data.title}
                    </div>
                )}
            </Draggable>
        </>
    )
}

export default MyScheduleListItem;