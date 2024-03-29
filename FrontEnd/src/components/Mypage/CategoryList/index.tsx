import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';
import { IoIosArrowBack } from 'react-icons/io';
import useGetLogout from '@src/hooks/react-query/useGetLogout';

interface CategoryListProps {}

const CategoryList = ({}: CategoryListProps) => {
  const { refetch: refetchLogout } = useGetLogout();

  const onClickLogout = useCallback(() => {
    refetchLogout();
  }, []);

  return (
    <section className="[&>ul:first:p-3] [&>ul+ul]:mt-[-0.5rem]">
      <CategoryUl>
        {category1.map(category => (
          <CategoryLi>
            <Link to={category.route}>{category.menu}</Link>
            <IoIosArrowBack className="absolute right-0 top-3 rotate-180" />
          </CategoryLi>
        ))}
      </CategoryUl>
      <CategoryUl>
        <CategoryLi
          css={tw`p-0`}
          onClick={onClickLogout}
        >
          로그아웃
        </CategoryLi>
      </CategoryUl>
    </section>
  );
};

const category1 = [
  { menu: '내가 찜한 장소', route: 'like' },
  { menu: '나의 리뷰', route: 'review' },
  { menu: '내가 방문한 장소', route: 'visit' },
];

const CategoryUl = tw.ul`
    bg-white first:(relative top-[-2rem])  
    z-30 w-[90%] m-auto rounded p-5 shadow-lg
`;

const CategoryLi = tw.li`
    py-2 text-h5 relative
    [> a]:block
`;

export default CategoryList;
