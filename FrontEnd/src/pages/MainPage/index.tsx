import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import tw from 'twin.macro';

import useToast from '@src/hooks/useToast';

import SearchButton from '@src/components/common/Button/SearchButton';
import SearchPage from '@src/pages/SearchPage';
import MapInfoPage from '../MapInfoPage';
import MarkerBottomSheet from '@src/components/Main/MarkerBottomSheet';
import TabSlide from '@src/components/common/TabSlide/TabSlide';
import { main } from './style';
import useKakaoMap from '@src/components/common/Map/useKakaoMap';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryAtom } from '@src/recoil/marker/category/atom';

interface MapPageProps {}
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
const mainTabCategory: ImainTabCategory[] = [
  {
    category: {
      title: '찜한장소',
      type: 1,
    },
  },
  {
    category: {
      title: '리뷰 쓴곳',
      type: 2,
    },
  },
  {
    category: {
      title: '전체',
      type: 0,
    },
  },
];

const MapPage = ({}: MapPageProps) => {
  const { Toast } = useToast();

  const [isShowSearchButton, setIsShowSearchButton] = useState(true);
  const setCategoryState = useSetRecoilState(categoryAtom);
  const categoryState = useRecoilValue(categoryAtom);

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
  const { Map, mapAreaChange, removeMarker } = useKakaoMap();
  //클릭했을때 해당 버튼의 텍스트와 객체 타이틀 이름이 같으면 해당 마커들을 물러온다
  const onClickBtn = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const result = mainTabCategory.find(
      el => el.category.title === target.textContent,
    );
    console.log('현재클릭값', categoryState);
    removeMarker(categoryState);
    setCategoryState(result?.category.type as number);
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
