import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  ReactNode,
  Suspense,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
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

interface MapPageProps {}

interface ImainTabCategory {
  category: {
    title: string;
    image?: ReactNode;
    place: any;
    type: number;
    //type: number;
    // onClick: ({ categoryType }: Tcategory) => void;
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

const MapPage = ({}: MapPageProps) => {
  const { Toast } = useToast();

  const [isShowSearchButton, setIsShowSearchButton] = useState(true);
  const setCategoryState = useSetRecoilState(categoryAtom);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const href = new URLSearchParams(location.search);
    const isShowButton = href.get('showButton');
    setIsShowSearchButton(isShowButton === 'false' ? false : true);
  }, [location.search]);

  const handleClickSearchButton = () => {
    navigate('/map/search');
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

      {isShowSearchButton && (
        <div
          css={tw`fixed top-0 left-0 z-10 flex items-center justify-center w-full h-70`}
        >
          <SearchButton
            nowPage={'map'}
            onClickSearchButton={handleClickSearchButton}
            css={tw`z-[15]`}
          />
        </div>
      )}

      <Toast />
      <MarkerBottomSheet />
    </>
  );
};

export default MapPage;
