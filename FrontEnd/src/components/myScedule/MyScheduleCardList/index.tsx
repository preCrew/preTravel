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
  const css = `w-[370px] flex flex-wrap gap-6 pt-3 pb-3`;

  return (
    <div className={css}>
      {cardList.map((card, index) => (
        <MyScheduleCard
          key={card.id}
          index={index}
          deleteMode={deleteMode}
          {...card}
        />
      ))}
    </div>
  );
};

export default MyScheduleCardList;
