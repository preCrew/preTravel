import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import tw from 'twin.macro';

import ReviewEditPage from '../ReviewEditPage';
import ReviewViewPage from '../ReviewViewPage';

interface ReviewPageProps {}

const ReviewPage = ({}: ReviewPageProps) => {
  return (
    <div css={tw`w-full h-full flex flex-col`}>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense>
              <ReviewViewPage />
            </Suspense>
          }
        />
        <Route
          path="/edit"
          element={<ReviewEditPage />}
        />
      </Routes>
    </div>
  );
};

export default ReviewPage;
