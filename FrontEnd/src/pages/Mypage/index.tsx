import React from 'react';
import tw, { css } from 'twin.macro';

import CategoryList from '@src/components/common/Mypage/CategoryList';
import Profile from '@src/components/common/Mypage/Profile';
import Nav from '@src/components/common/Layout/Nav';

const Mypage = () => {
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

export default Mypage;
