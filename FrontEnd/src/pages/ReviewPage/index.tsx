import { Route, Routes, useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import ReviewEditPage from '../ReviewEditPage';
import ReviewViewPage from '../ReviewViewPage';

import TopBar from '@src/components/common/TobBar';
import TopText from '@src/components/common/Text/TopText';
import useLocationState from '@src/hooks/recoil/useLocationState';
import { Suspense } from 'react';

interface ReviewPageProps {}

const ReviewPage = ({}: ReviewPageProps) => {
  return (
    <div css={tw`w-full h-full flex flex-col`}>
      <Routes>
        <Route
          path="/edit"
          element={<ReviewEditPage />}
        />
        <Route
          path=":id"
          element={
            <Suspense>
              <ReviewViewPage />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default ReviewPage;
