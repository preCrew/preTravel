import useMyScheduleGetQuery from '@src/hooks/react-query/useGetMyScheduleQuery';

import { useNavigate } from 'react-router-dom';
import MyScheduleCard from '../MyScheduleCard';

interface MyScheduleCardListProps {
  deleteMode?: boolean;
}

const MyScheduleCardList = ({ deleteMode }: MyScheduleCardListProps) => {
  const navigate = useNavigate();

  const { data: lists } = useMyScheduleGetQuery();

  const handleClickCard = (cardIdx: number, index: number) => {
    navigate(`${cardIdx}`, { state: lists?.[index].city });
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