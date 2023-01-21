import { useState } from 'react';
import CheckBox from './CheckBox';
import Card from './style';

export interface MyScheduleCardI {
  id: string;
  title: string;
  region: string;
  startDate: string;
  endDate: string;
  imagePaths?: string[];
}
interface MyScheduleCardProps extends MyScheduleCardI {
  index: number;
  onClick: () => void;
  deleteMode?: boolean;
}

const MyScheduleCard = ({
  title,
  index,
  region,
  startDate,
  endDate,
  onClick,
  imagePaths,
  deleteMode,
}: MyScheduleCardProps) => {
  const [isCheck, setIsCheck] = useState(false);

  const handleClickCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheck(e.target.checked);
  };
  const handleClickCard = () => {
    !deleteMode && onClick();
  };

  return (
    <div
      className={Card.block}
      onClick={handleClickCard}
    >
      <div className={Card.blockInner(imagePaths ? imagePaths[0] : '', index)}>
        {deleteMode && <CheckBox onClick={handleClickCheckBox} />}
        <div className={Card.flexBox}>
          <p className={Card.title}>{title}</p>
          <p className={Card.region}>{region}</p>
          <p className={Card.date}>{`${startDate}${
            endDate && `~${endDate}`
          }`}</p>
        </div>
      </div>
    </div>
  );
};

export default MyScheduleCard;
