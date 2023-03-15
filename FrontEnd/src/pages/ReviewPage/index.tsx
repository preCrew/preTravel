import { Route, Routes, useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import ReviewEditPage from '../ReviewEditPage';
import ReviewViewPage from '../ReviewViewPage';

import TopBar from '@src/components/common/TobBar';
import TopText from '@src/components/common/Text/TopText';
import useLocationState from '@src/hooks/recoil/useLocationState';

interface ReviewPageProps {}

const ReviewPage = ({}: ReviewPageProps) => {
  const navigate = useNavigate();
  const {
    locationState: {
      selectData: { name: topBarName },
    },
  } = useLocationState();

  const handleClickBackButton = () => {
    navigate(-1);
  };

  return (
    <div css={tw`w-full h-full flex flex-col`}>
      <TopBar onClickBackButton={handleClickBackButton}>
        <TopText>{topBarName}</TopText>
      </TopBar>

      <div css={tw`pl-4 pr-4 pb-4 w-h-full`}>
        <Routes>
          <Route
            path="/edit"
            element={<ReviewEditPage />}
          />
          <Route
            path=":id"
            element={<ReviewViewPage />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default ReviewPage;
