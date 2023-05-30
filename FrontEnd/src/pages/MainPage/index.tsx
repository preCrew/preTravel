import { useNavigate } from 'react-router-dom';
import React, {
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
  Suspense,
} from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import tw from 'twin.macro';

import useToast from '@src/hooks/useToast';

import SearchButton from '@src/components/common/Button/SearchButton';
import MarkerBottomSheet from '@src/components/Main/MarkerBottomSheet';
import TabSlide from '@src/components/common/TabSlide/TabSlide';
import useKakaoMap from '@src/components/common/Map/useKakaoMap';
import { categoryAtom } from '@src/recoil/marker/category/atom';

import { main } from './style';
import IcoFavorite from '@src/assets/svgs/ico-favorite.svg?url';
import IcoReview from '@src/assets/svgs/ico-review.svg?url';
import { mapAtom } from '@src/recoil/map/atom';
import useOvelay from '@src/hooks/ovelay/useOvelay';
import SearchOvelay from '@src/components/Ovelays/SeaechOvelay';
import useRegionGetQuery, {
  RegionData,
} from '@src/hooks/react-query/useGetRegionQuery';
import useLocationState from '@src/hooks/recoil/useLocationState';
import useSearchRegionOvelay from '@src/hooks/ovelay/Ovelays/useSearchRegionOvelay';
import useSearchPageState from '@src/hooks/recoil/useSearchPageState';

interface MainPageProps {}

interface ImainTabCategory {
  category: {
    title: string;
    image?: ReactNode;
    place: any;
    type: number;
  };
}
export const mainTabCategory: ImainTabCategory[] = [
  {
    category: {
      title: '찜한장소',
      image: IcoFavorite,
      place: null,
      type: 1,
    },
  },
  {
    category: {
      title: '리뷰 쓴곳',
      image: IcoReview,
      place: null,
      type: 2,
    },
  },
  {
    category: {
      title: '전체',
      image: [IcoFavorite, IcoReview],
      place: null,
      type: 3,
    },
  },
];

const MainPage = ({}: MainPageProps) => {
  // const { getCurrentLocation, Map } = useKakaoMap();
  const { Toast } = useToast();

  const setCategoryState = useSetRecoilState(categoryAtom);
  // const [currentMapState, setCurrentMapState] = useRecoilState(mapAtom);

  const navigate = useNavigate();

  const handleClickSearchButton = () => {
    navigate('/search/region');
  };

  //클릭했을때 해당 버튼의 텍스트와 객체 타이틀 이름이 같으면 해당 마커들을 물러온다
  const onClickBtn = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const target = e.target as HTMLElement;
    const result = mainTabCategory.find(
      el => el.category.title === target.textContent,
    );
    console.log('현재클릭', result);
    setCategoryState(result?.category);
  }, []);

  // const map = useMemo(() => <Map />, []);
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

      <div
        css={tw`fixed top-0 left-0 z-10 flex items-center justify-center w-full h-70`}
      >
        <SearchButton
          bgColor="gray2"
          placeHolder="장소를 검색해주세요"
          onClickSearchButton={handleClickSearchButton}
          css={tw`z-[15]`}
        />
      </div>
      {/* {map} */}
      <Toast />

      <MarkerBottomSheet />
    </>
  );
};

export default MainPage;
