import { Suspense, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import MyScheduleCardList from '@src/components/MyScedule/MyScheduleCardList';
import SelectNumberBox from '../../components/MyScedule/SelectNumberBox';
import IconBox from '../../components/MyScedule/IconBox';
import TopBar from '@src/components/common/TobBar';

import cardListAtom from '@src/recoil/cardList/atom';

import Button from '@src/components/common/Button';
import useMyScheduleAddQuery from '@src/hooks/react-query/useMyScheduleAddQuery';
import filteredCardListSelector from '@src/recoil/cardList/selector';
import CancelBtn from '@src/components/MyScedule/CancelBtn';
import useMyScheduleGetQuery from '@src/hooks/react-query/useMyScheduleGetQuery';
import useMyScheduleDeleteQuery from '@src/hooks/react-query/useMyScheduleDeleteQuery';

import { MyScheduleDiv } from './style';

const MySchedule2 = () => {
  const [isRemoveMode, setIsRemoveMode] = useState(false);

  const [selectedCardListState, setSelectedCardListState] =
    useRecoilState(cardListAtom);
  const filterdSelectedListState = useRecoilValue(filteredCardListSelector);

  const { data: lists, isFetched } = useMyScheduleGetQuery();
  const { mutate } = useMyScheduleDeleteQuery(selectedCardListState);
  const { mutate: addSchedule } = useMyScheduleAddQuery(selectedCardListState);

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
        <div className={MyScheduleDiv.childrenBox}>
          <div className={MyScheduleDiv.title}>내 일정</div>
          <div className={MyScheduleDiv.buttonBox}>
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
          color="primary1"
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
