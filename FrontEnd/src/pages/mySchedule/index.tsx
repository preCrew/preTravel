import { useNavigate } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import tw from 'twin.macro';

import filteredCardListSelector from '@src/recoil/cardList/selector';
import useCardListState from '@src/hooks/recoil/useCardListState';

import useMyScheduleDeleteQuery from '@src/hooks/react-query/useDeleteMyScheduleQuery';

import Button from '@src/components/common/Button';

import { MyScheduleDiv } from './style';

import useSearchRegionOvelay from '@src/hooks/ovelay/Ovelays/useSearchRegionOvelay';
import SelectNumberBox from '@src/components/MyScedule/SelectNumberBox';
import CancelBtn from '@src/components/MyScedule/CancelBtn';
import IconBox from '@src/components/MyScedule/IconBox';
import { SkeletonMyScheduleCard } from '@src/components/MyScedule/MyScheduleCard';
import MyScheduleCardList from '@src/components/MyScedule/MyScheduleCardList';
import Nav, { navH } from '@src/components/common/Layout/Nav';

const MySchedule2 = () => {
  const navigate = useNavigate();
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editCard, setEditCard] = useState<any>([]);

  const { clearCardState } = useCardListState();
  const filterdSelectedListState = useRecoilValue(filteredCardListSelector);

  const { mutate: deleteScheduleQuery, isSuccess } = useMyScheduleDeleteQuery();

  useEffect(() => {
    if (isSuccess) clearCardState();
  }, [isSuccess]);

  const handleClickBackButton = () => {
    navigate(-1);
  };
  const handleClickEditButton = () => {
    //navigate('/schedulePlan/edit', { state: editCard });
    setIsEditMode(prev => !prev);
  };
  const handleClickAddButton = () => {
    navigate('/search/region');
  };
  const handleClickTopRemoveButton = () => {
    setIsDeleteMode(true);
  };
  const handleClickBottomRemoveButton = () => {
    setIsDeleteMode(false);
    deleteScheduleQuery();
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
              onClickEditButton={handleClickEditButton}
              onClickAddButton={handleClickAddButton}
              onClickRemoveButton={handleClickTopRemoveButton}
            />
          )}
        </div>
      </div>
      {isEditMode && (
        <p className="px-5 text-body3">편집할 일정을 클릭하세요.</p>
      )}
      <div css={tw`overflow-y-scroll`}>
        <Suspense fallback={<SkeletonMyScheduleCard />}>
          <MyScheduleCardList
            deleteMode={isDeleteMode}
            editMode={isEditMode}
            setEditCard={setEditCard}
          />
        </Suspense>
        {filterdSelectedListState > 0 && (
          <Button
            type="large"
            color="primary1"
            onClick={handleClickBottomRemoveButton}
            className={`fixed bottom-0`}
          >
            삭제하기
          </Button>
        )}
      </div>
      {/*nav*/}
      <Nav />
    </>
  );
};

export default MySchedule2;
