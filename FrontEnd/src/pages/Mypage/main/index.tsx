import { css } from '@emotion/react';
import tw from 'twin.macro';

import Nav from '@src/components/common/Layout/Nav';
import CategoryList from '@src/components/common/Mypage/CategoryList';
import Profile from '@src/components/common/Mypage/Profile';

const MypageMain = () => {
  return (
    <div
      css={[
        tw`h-full bg-gray4 after:(content-[''] h-[55%] w-full absolute left-0 top-0 bg-primary1)`,
        css``,
      ]}
    >
      <Profile />
      <CategoryList />
      <Nav />
    </div>
  );
};

export default MypageMain;
