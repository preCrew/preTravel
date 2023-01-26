import cardListAtom from '@src/recoil/cardList/atom';
import { useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isCaseOrDefaultClause } from 'typescript';
import CheckBox from './CheckBox';
import Card from './style';

export interface MyScheduleCardI {
  id: string;
  title: string;
  region: string;
  dateRange: string[];
  imagePaths?: string[];
  schedule?: [];
}
interface MyScheduleCardProps extends MyScheduleCardI {
  index: number;
  deleteMode?: boolean;
}

const MyScheduleCard = ({
  id,
  title,
  index,
  region,
  dateRange,
  imagePaths,
  deleteMode,
}: MyScheduleCardProps) => {
  const [selectedCardList, setSelectedCardList] = useRecoilState(cardListAtom);
  const [isSeleted, setIsSeleted] = useState(false);

  const changeCheckedState = (checked: boolean) => {
    const newCardList = selectedCardList.map(card =>
      card.id === id ? { ...card, isSeleted: checked } : card,
    );
    setIsSeleted(checked);
    setSelectedCardList(newCardList);
  };

  const handleClickCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    // seletedCheckBox atom에서 해당 id의 값을 수정
    changeCheckedState(e.target.checked);
  };
  const handleClickCard = () => {
    if (deleteMode) {
      changeCheckedState(!isSeleted);
    } else {
      // TODO: 해당 카드의 상세페이지로 이동
      console.log(id);
    }
  };
  console.log('var(--contentInner)');
  const generateNum = Math.floor(Math.random() * 4 + 1);
  const bgColor = ['#fedcf5', '#c7ecf4', '#d6ede5', '#7ca3de', '#ffcfdb'];
  const bgColorValue = useMemo(() => bgColor[generateNum], []);

  return (
    <li
      className={Card.block}
      onClick={handleClickCard}
    >
      <div
        className={Card.blockInner(imagePaths ? imagePaths[0] : '', index)}
        style={{ backgroundColor: bgColorValue }}
      >
        {/* 삭제모드면 체크박스 표시 */}
        {deleteMode && (
          <CheckBox
            onChange={handleClickCheckBox}
            isChecked={isSeleted}
          />
        )}
        <div className={Card.content}>
          {/* 언제나 카드 표시 */}
          <p className={Card.title}>{title}</p>
          <p className={Card.region}>{region}</p>
          <p className={Card.date}>{`${dateRange[0]}${
            dateRange[1] && `~${dateRange[1]}`
          }`}</p>
        </div>
      </div>
    </li>
  );
};

export default MyScheduleCard;
