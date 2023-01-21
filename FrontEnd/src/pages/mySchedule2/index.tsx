import { MyScheduleCardI } from '@src/components/myScedule/MyScheduleCard';
import MyScheduleCardList from '@src/components/myScedule/MyScheduleCardList';

const MySchedule2 = () => {
  const mySchedulePageCss = `
    w-full flex justify-center p-3
  `;
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
  return (
    <div className={mySchedulePageCss}>
      <MyScheduleCardList cardList={lists} />
    </div>
  );
};

export default MySchedule2;
