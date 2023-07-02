import { Dispatch, SetStateAction, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import useMyScheduleGetQuery from '@src/hooks/react-query/useGetMyScheduleQuery';

import MyScheduleCard from '../MyScheduleCard';

interface MyScheduleCardListProps {
  deleteMode?: boolean;
  editMode: boolean;
  setEditCard: Dispatch<SetStateAction<any>>;
}

const MyScheduleCardList = ({
  deleteMode,
  editMode,
  setEditCard,
}: MyScheduleCardListProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: lists } = useMyScheduleGetQuery();

  useEffect(() => {
    queryClient.invalidateQueries(['mySchedule']);
  }, [queryClient]);

  const handleClickCard = (cardIdx: number, index: number) => {
    if (!editMode) {
      navigate(`${cardIdx}`, { state: lists?.[index].city });
    } else {
      navigate(`/schedulePlan/edit`, { state: lists?.[index] });
      setEditCard(lists?.[index]);
    }
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
