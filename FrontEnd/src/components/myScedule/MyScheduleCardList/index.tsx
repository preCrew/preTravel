import useMyScheduleGetQuery, {
  MySchedule,
} from '@src/hooks/react-query/useGetMyScheduleQuery';
import MyScheduleCard from '../MyScheduleCard';

interface MyScheduleCardListProps {
  // cardList?: MySchedule[];
  deleteMode?: boolean;
}

const MyScheduleCardList = ({
  deleteMode,
}: // cardList,
// deleteMode,
MyScheduleCardListProps) => {
  const { data: lists } = useMyScheduleGetQuery();
  return (
    <ul className="grid grid-cols-2 gap-4 content-inner">
      {lists &&
        lists.map((card, index) => (
          <MyScheduleCard
            key={card.idx}
            deleteMode={deleteMode}
            {...card}
          />
        ))}
    </ul>
  );
};

export default MyScheduleCardList;
