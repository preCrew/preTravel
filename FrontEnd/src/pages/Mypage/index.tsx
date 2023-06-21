import tw, { css } from 'twin.macro';
import { Routes, Route } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import CategoryList from '@src/components/common/Mypage/CategoryList';
import Profile from '@src/components/common/Mypage/Profile';
import Nav from '@src/components/common/Layout/Nav';
import useGetUserInfo from '@src/hooks/react-query/useGetUserInfo';
import { userAtom } from '@src/recoil/user/atom';
import MypageLike from './like';
import MypageMain from './main';

const Mypage = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<MypageMain />}
        />
        <Route
          path="/like"
          element={
            <Suspense>
              <MypageLike />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};

export default Mypage;
