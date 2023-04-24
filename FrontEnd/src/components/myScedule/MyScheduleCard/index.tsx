import { useMemo, useState } from 'react';

import { MySchedule } from '@src/hooks/react-query/useGetMyScheduleQuery';
import useCardListState from '@src/hooks/recoil/useCardListState';

import CheckBox from '../../common/CheckBox';
import { Card, SkeletonCard } from './style';
import tw from 'twin.macro';

interface MyScheduleCardProps extends MySchedule {
  deleteMode?: boolean;
  onClickCard?: (cardIdx: number) => void;
}

const MyScheduleCard = ({
  startDate,
  endDate,
  name,
  idx: cardIdx,
  city,
  deleteMode,
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
      onClickCard?.(cardIdx);
    }
  };

  const generateNum = Math.floor(Math.random() * 4 + 1);
  const bgColor = ['#fedcf5', '#c7ecf4', '#d6ede5', '#7ca3de', '#ffcfdb'];
  const bgColorValue = useMemo(() => bgColor[generateNum], []);

  return (
    <li
      className={Card.block}
      onClick={handleClickCard}
    >
      <div
        css={Card.blockInner('', cardIdx)}
        style={{ backgroundColor: bgColorValue }}
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
        </div>
      </div>
    </li>
  );
};

const iterator = [1, 2, 3, 4, 5, 6, 7, 8];
export const SkeletonMyScheduleCard = () => {
  return (
    <>
      <div css={tw`grid grid-cols-2 gap-4 w-h-full relative content-inner`}>
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

export default MyScheduleCard;
