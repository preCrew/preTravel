import React, { useCallback, useEffect, useMemo } from 'react';

import { main } from './style';

import useKakaoMap from '@src/components/common/Map/useKakaoMap';
import TabSlide from '@src/components/common/TabSlide/TabSlide';
import MarkerBottomSheet from '@src/components/Main/MarkerBottomSheet';

type Tcategory = {
  // data: any;
  categoryType: number;
};
interface ImainTabCategory {
  category: {
    title: string;
    type: number;
    // onClick: ({ categoryType }: Tcategory) => void;
  };
}

const Main = () => {
  const {
    Map,
    addUserSavedMarker,
    removeMarker,
    currentLocation,
    mapAreaChange,
  } = useKakaoMap();

  //const { data: userReview } = useGetReveiw('1');

  const map = useMemo(() => <Map />, []);

  useEffect(() => {
    currentLocation();
  }, []);

  //const mainTabCategory = ['찜한장소', '리뷰 쓴 곳', '전체'];

  const mainTabCategory: ImainTabCategory[] = [
    {
      category: {
        title: '찜한장소',
        type: 0,
      },
    },
    {
      category: {
        title: '리뷰 쓴곳',
        type: 1,
      },
    },
    {
      category: {
        title: '전체',
        type: 0,
      },
    },
  ];

  //클릭했을때 해당 버튼의 텍스트와 객체 타이틀 이름이 같으면 그 객체의 onClick을 불러온다
  const onClickBtn = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const result = mainTabCategory.find(
      el => el.category.title === target.textContent,
    );

    mapAreaChange(result?.category.type as number);
    //Object.keys(mainTabCategory).find(key => mainTabCategory[key] as keyof );

    // if (target.textContent === mainTabCategory[0]) {
    //   addUserSavedMarker(userLike.data, 0);
    //   removeMarker(1);
    // }
    // if (target.textContent === mainTabCategory[1]) {
    //   removeMarker(0);
    //   //addUserSavedMarker(userReview.data, 1);
    // }
    // if (target.textContent === mainTabCategory[2]) {
    //   console.log('전체');
    //   removeMarker(0);
    //   removeMarker(1);
    // }
  };

  return (
    <>
      <header className={main.header}>
        <TabSlide
          active={false}
          data={mainTabCategory}
          category="카테고리별"
          onClick={onClickBtn}
        />
      </header>
      {map}
      <MarkerBottomSheet />
    </>
  );
};

export default Main;
