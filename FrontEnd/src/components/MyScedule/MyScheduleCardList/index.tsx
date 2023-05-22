import useMyScheduleGetQuery from '@src/hooks/react-query/useGetMyScheduleQuery';
import MyScheduleCard from '../MyScheduleCard';
import { useNavigate } from 'react-router-dom';

interface MyScheduleCardListProps {
  deleteMode?: boolean;
}

const MyScheduleCardList = ({ deleteMode }: MyScheduleCardListProps) => {
  const navigate = useNavigate();

  const { data: lists } = useMyScheduleGetQuery();

  const handleClickCard = (cardIdx: number, index: number) => {
    navigate(`${cardIdx}`, { state: lists?.[index].city });
    console.log(cardIdx);
  };
  return (
    <ul className="grid grid-cols-2 gap-4 content-inner">
      {lists &&
        lists.map((card, index) => (
          <MyScheduleCard
            key={card.idx}
            index={index}
            deleteMode={deleteMode}
            onClickCard={handleClickCard}
            {...card}
          />
        ))}
    </ul>
  );
};

export default MyScheduleCardList;
