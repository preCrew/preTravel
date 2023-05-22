import { useNavigate } from 'react-router-dom';
import { Suspense, useState } from 'react';
import { useRecoilValue } from 'recoil';
import tw from 'twin.macro';

import filteredCardListSelector from '@src/recoil/cardList/selector';
import useCardListState from '@src/hooks/recoil/useCardListState';

import useMyScheduleDeleteQuery from '@src/hooks/react-query/useDeleteMyScheduleQuery';

import TopBar from '@src/components/common/TobBar';
import Button from '@src/components/common/Button';
import MyScheduleCardList from '@src/components/myScedule2/MyScheduleCardList';
import CancelBtn from '@src/components/myScedule2/CancelBtn';
import { SkeletonMyScheduleCard } from '@src/components/myScedule2/MyScheduleCard';
import IconBox from '@src/components/myScedule2/IconBox';
import mySchedule from './style';
import SelectNumberBox from '@src/components/myScedule2/SelectNumberBox';

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
      <div className={mySchedule.childrenBox}>
        <div className={mySchedule.title}>내 일정</div>
        <div className={mySchedule.buttonBox}>
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
