import BottomSheet from "@src/components/BottomSheet";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MyScheduleListItem from "./MyScheduleListItem";

const data = [
    {id:'1',title:'test1',order:1},
    {id:'2',title:'test2',order:2},
    {id:'3',title:'test3',order:3},
    {id:'4',title:'test4',order:4},
]

//재정렬

const MyScheduleList = () => {
    const [myschedulData,setmySchedulData] = useState(data)
    const [drag,setDrag] = useState(false)

    const onDragStart = () => {
        setDrag(true)
    }

    const onDragEnd = (result: any,provided: any) => {
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
		//console.log('끝');
        setDrag(false)   
	};

    return (
        <>
           <BottomSheet dragOn={drag}>
                <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                    <Droppable droppableId="column1">
                        {(provided, snap) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {myschedulData.map((it, i) => (
                                   <MyScheduleListItem data={it} index={i} key={it.id}/>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>          
            </BottomSheet> 
        </>
    )
}

export default MyScheduleList;