import MyScheduleCard, { MyScheduleCardI } from '../MyScheduleCard';

interface MyScheduleCardListProps {
  cardList: MyScheduleCardI[];
}

const MyScheduleCardList = ({ cardList }: MyScheduleCardListProps) => {
  const css = `w-[370px] flex flex-wrap gap-6 pt-3 pb-3`;
  return (
    <div className={css}>
      {cardList.map((card, index) => (
        <MyScheduleCard
          key={card.id}
          index={index}
          onClick={() => console.log('click')}
          {...card}
        />
      ))}
    </div>
  );
};

export default MyScheduleCardList;
