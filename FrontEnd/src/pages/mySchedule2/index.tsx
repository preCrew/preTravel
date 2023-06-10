import { useNavigate } from 'react-router-dom';
import { Suspense, useState } from 'react';
import { useRecoilValue } from 'recoil';
import tw from 'twin.macro';

import filteredCardListSelector from '@src/recoil/cardList/selector';
import useCardListState from '@src/hooks/recoil/useCardListState';

import useMyScheduleDeleteQuery from '@src/hooks/react-query/useDeleteMyScheduleQuery';

import Button from '@src/components/common/Button';

import { MyScheduleDiv } from '../MySchedule/style';

import IconBox from '@src/components/MyScedule/IconBox';
import SelectNumberBox from '@src/components/MyScedule/SelectNumberBox';
import CancelBtn from '@src/components/MyScedule/CancelBtn';
import MyScheduleCardList from '@src/components/MyScedule/MyScheduleCardList';
import { SkeletonMyScheduleCard } from '@src/components/MyScedule/MyScheduleCard';

const MySchedule2 = () => {
  const navigate = useNavigate();
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const { clearCardState } = useCardListState();
  const filterdSelectedListState = useRecoilValue(filteredCardListSelector);

  const { mutate: deleteScheduleQuery } = useMyScheduleDeleteQuery();

  const handleClickBackButton = () => {
    navigate(-1);
  };
  const handleClickAddButton = () => {
    navigate('/search');
  };
  const handleClickTopRemoveButton = () => {
    setIsDeleteMode(true);
  };
  const handleClickBottomRemoveButton = () => {
    setIsDeleteMode(false);
    deleteScheduleQuery();
    clearCardState();
  };
  const handleClickCancelButton = () => {
    setIsDeleteMode(false);
    clearCardState();
  };

  return (
    <>
      <div className={MyScheduleDiv.childrenBox}>
        <div className={MyScheduleDiv.title}>내 일정</div>
        <div className={MyScheduleDiv.buttonBox}>
          {isDeleteMode ? (
            <div className="flex">
              <CancelBtn onClick={handleClickCancelButton} />
              <SelectNumberBox />
            </div>
          ) : (
            <IconBox
              onClickAddButton={handleClickAddButton}
              onClickRemoveButton={handleClickTopRemoveButton}
            />
          )}
        </div>
      </div>

      <div css={tw`overflow-y-scroll`}>
        <Suspense fallback={<SkeletonMyScheduleCard />}>
          <MyScheduleCardList deleteMode={isDeleteMode} />
        </Suspense>
        {filterdSelectedListState > 0 && (
          <Button
            type="large"
            color="primary1"
            onClick={handleClickBottomRemoveButton}
            css={tw`absolute bottom-2 `}
          >
            삭제하기
          </Button>
        )}
      </div>
    </>
  );
};

export default MySchedule2;
