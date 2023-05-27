<<<<<<< HEAD
import cardListAtom from '@src/recoil/cardList/atom';
import { useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import CheckBox from '../../common/CheckBox';
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
=======
import { useMemo, useState } from 'react';

import { MySchedule } from '@src/hooks/react-query/useGetMyScheduleQuery';
import useCardListState from '@src/hooks/recoil/useCardListState';

import CheckBox from '../../common/CheckBox';
import { Card, SkeletonCard } from './style';
import tw from 'twin.macro';

interface MyScheduleCardProps extends MySchedule {
  deleteMode?: boolean;
  index?: number;
  onClickCard?: (cardIdx: number, idx: number) => void;
}

const MyScheduleCard = ({
  startDate,
  endDate,
  name,
  idx: cardIdx,
  city,
  deleteMode,
  index,
  file,
  onClickCard,
}: MyScheduleCardProps) => {
  const { changeCardState } = useCardListState();
  const [isSeleted, setIsSeleted] = useState(false);

  const handleClickCheckBox = () => {
    setIsSeleted(!isSeleted);
    changeCardState(cardIdx, isSeleted);
  };
  const handleClickCard = () => {
    if (deleteMode) {
      handleClickCheckBox();
    } else {
      onClickCard?.(cardIdx, index as number);
    }
  };

>>>>>>> dev
  const generateNum = Math.floor(Math.random() * 4 + 1);
  const bgColor = ['#fedcf5', '#c7ecf4', '#d6ede5', '#7ca3de', '#ffcfdb'];
  const bgColorValue = useMemo(() => bgColor[generateNum], []);

<<<<<<< HEAD
=======
  console.log(file.length);

>>>>>>> dev
  return (
    <li
      className={Card.block}
      onClick={handleClickCard}
    >
      <div
<<<<<<< HEAD
        className={Card.blockInner(imagePaths ? imagePaths[0] : '', index)}
        style={{ backgroundColor: bgColorValue }}
      >
        {/* 삭제모드면 체크박스 표시 */}
        {deleteMode && <CheckBox onChange={handleClickCheckBox} />}
        <div className={Card.content}>
          {/* 언제나 카드 표시 */}
          <p className={Card.title}>{title}</p>
          <p className={Card.region}>{region}</p>
          <p className={Card.date}>{`${dateRange[0]}${
            dateRange[1] && `~${dateRange[1]}`
          }`}</p>
=======
        css={[
          Card.blockInner('', cardIdx),
          file.length
            ? { backgroundImage: `url(${file[0]?.fileDir})` }
            : { background: bgColorValue },
          tw`bg-center bg-no-repeat bg-cover`,
        ]}
      >
        {/* 삭제모드면 체크박스 표시 */}
        {deleteMode && (
          <CheckBox
            onChange={handleClickCheckBox}
            cheked={isSeleted}
          />
        )}
        <div className={Card.content}>
          {/* 언제나 카드 표시 */}
          <p className={Card.title}>{name}</p>
          <p className={Card.region}>{city}</p>
          <p className={Card.date}>{`${startDate} ~ ${endDate}`}</p>
>>>>>>> dev
        </div>
      </div>
    </li>
  );
};

<<<<<<< HEAD
=======
const iterator = [1, 2, 3, 4, 5, 6, 7, 8];
export const SkeletonMyScheduleCard = () => {
  return (
    <>
      <div css={tw`relative grid grid-cols-2 gap-4 w-h-full content-inner`}>
        {iterator.map(id => (
          <div
            css={SkeletonCard.Inner}
            key={id}
          >
            {/* 삭제모드면 체크박스 표시 */}
            <div css={SkeletonCard.Content}>
              {/* 언제나 카드 표시 */}
              <p css={SkeletonCard.Title} />
              <p css={SkeletonCard.Region} />
              <p css={SkeletonCard.Date} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

>>>>>>> dev
export default MyScheduleCard;
