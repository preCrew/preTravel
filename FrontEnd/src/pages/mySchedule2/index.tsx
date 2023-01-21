import { MyScheduleCardI } from '@src/components/myScedule/MyScheduleCard';

import TopBar from '@src/components/common/TobBar';
import MyScheduleCardList from '@src/components/myScedule/MyScheduleCardList';
import IconButton from '@src/components/common/Button/IconButton';
import mySchedule from './style';

const lists: MyScheduleCardI[] = [
  {
    id: '1',
    title: '씐나는 서울여행123213122121321213131231231232131244444444',
    startDate: '2021.10.10',
    endDate: '2021.10.10',
    region: '서울',
  },
  {
    id: '2',
    title: '제주제주제주여행',
    startDate: '2021.10.10',
    endDate: '2021.10.10',
    region: '제주도',
  },
  {
    id: '3',
    title: '도오오오옹해',
    startDate: '2021.10.10',
    endDate: '2021.10.10',
    region: '강원도',
  },
  {
    id: '16',
    title: '도오오오옹해',
    startDate: '2021.10.10',
    endDate: '2021.10.10',
    region: '강원도',
  },
  {
    id: '4',
    title: '도오오오옹해',
    startDate: '2021.10.10',
    endDate: '2021.10.10',
    region: '강원도',
  },
  {
    id: '5',
    title: '도오오오옹해',
    startDate: '2021.10.10',
    endDate: '2021.10.10',
    region: '강원도',
  },
  {
    id: '6',
    title: '도오오오옹해',
    startDate: '2021.10.10',
    endDate: '2021.10.10',
    region: '강원도',
  },
  {
    id: '7',
    title: '도오오오옹해',
    startDate: '2021.10.10',
    endDate: '2021.10.10',
    region: '강원도',
  },
  {
    id: '8',
    title: '도오오오옹해',
    startDate: '2021.10.10',
    endDate: '2021.10.10',
    region: '강원도',
  },
  {
    id: '9',
    title: '도오오오옹해',
    startDate: '2021.10.10',
    endDate: '2021.10.10',
    region: '강원도',
  },
  {
    id: '10',
    title: '도오오오옹해',
    startDate: '2021.10.10',
    endDate: '2021.10.10',
    region: '강원도',
  },
  {
    id: '11',
    title: '도오오오옹해',
    startDate: '2021.10.10',
    endDate: '2021.10.10',
    region: '강원도',
  },
];

const MySchedule2 = () => {
  const handleClickBackButton = () => {
    console.log('back');
    // TODO: 이전 페이지로 이동
  };
  const handleClickAddButton = () => {
    console.log('add');
    // TODO: 추가 페이지로 이동
  };
  const handleClickRemoveButton = () => {
    console.log('remove');
    // TODO: react-query로 서버에서 데이터 삭제
  };

  return (
    <div className={mySchedule.page}>
      <TopBar onClickBackButton={handleClickBackButton}>
        <div className={mySchedule.childrenBox}>
          <div className={mySchedule.title}>내 일정</div>
          <div className={mySchedule.buttonBox}>
            <IconButton
              type="add"
              onClick={handleClickAddButton}
            />
            <IconButton
              type="remove"
              onClick={handleClickRemoveButton}
            />
          </div>
        </div>
      </TopBar>
      <MyScheduleCardList cardList={lists} />
    </div>
  );
};

export default MySchedule2;
