import { useEffect, useState } from 'react';
import MyScheduleCard, { MyScheduleCardI } from '../MyScheduleCard';

interface MyScheduleCardListProps {
  cardList: MyScheduleCardI[];
  deleteMode?: boolean;
}

const MyScheduleCardList = ({
  cardList,
  deleteMode,
}: MyScheduleCardListProps) => {
  return (
    <ul className="grid grid-cols-2 gap-4 content-inner">
      {cardList.map((card, index) => (
        <MyScheduleCard
          key={card.id}
          index={index}
          deleteMode={deleteMode}
          {...card}
        />
      ))}
    </ul>
  );
};

export default MyScheduleCardList;
