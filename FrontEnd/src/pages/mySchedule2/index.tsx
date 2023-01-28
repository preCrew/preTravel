import { Suspense, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import MyScheduleCardList from '@src/components/myScedule/MyScheduleCardList';
import SelectNumberBox from '../../components/myScedule/SelectNumberBox';
import IconBox from '../../components/myScedule/IconBox';
import TopBar from '@src/components/common/TobBar';

import cardListAtom from '@src/recoil/cardList/atom';

import useMyScheduleQuery from '@src/hooks/useMyScheduleQuery';
import useMyScheduleDelete from '@src/hooks/useMyScheduleDelete';

import mySchedule from './style';
import Button from '@src/components/common/Button';
import useMyScheduleAdd from '@src/hooks/useMySchedulAdd';
import filteredCardListSelector from '@src/recoil/cardList/selector';
import CancelBtn from '@src/components/myScedule/CancelBtn';

const MySchedule2 = () => {
  const [isRemoveMode, setIsRemoveMode] = useState(false);

  const [selectedCardListState, setSelectedCardListState] =
    useRecoilState(cardListAtom);
  const filterdSelectedListState = useRecoilValue(filteredCardListSelector);

  const { data: lists, isFetched } = useMyScheduleQuery();
  const { mutate } = useMyScheduleDelete(selectedCardListState);
  const { mutate: addSchedule } = useMyScheduleAdd(selectedCardListState);

  useEffect(() => {
    // 리스트를 다 받아왔다면 recoil에 저장
    if (isFetched) {
      setSelectedCardListState(
        lists!.map(list => ({ id: list.id, isSeleted: false })),
      );
    }
  }, []);

  const handleClickBackButton = () => {
    console.log('back');
    // TODO: 이전 페이지로 이동
  };
  const handleClickAddButton = () => {
    addSchedule();
  };
  const handleClickTopRemoveButton = () => {
    setIsRemoveMode(true);
  };
  const handleClickBottomRemoveButton = () => {
    setIsRemoveMode(false);
    mutate();
  };

  return (
    <div>
      <TopBar onClickBackButton={handleClickBackButton}>
        <div className={mySchedule.childrenBox}>
          <div className={mySchedule.title}>내 일정</div>
          <div className={mySchedule.buttonBox}>
            {isRemoveMode ? (
              <div className="flex">
                <CancelBtn />
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
      </TopBar>
      <Suspense fallback={<div>로딩중</div>}>
        <MyScheduleCardList
          cardList={lists || []}
          deleteMode={isRemoveMode}
        />
      </Suspense>
      {filterdSelectedListState > 0 && (
        <Button
          type="large"
          color="blue"
          className=""
          onClick={handleClickBottomRemoveButton}
        >
          삭제하기 테스트 버튼
        </Button>
      )}
    </div>
  );
};

export default MySchedule2;