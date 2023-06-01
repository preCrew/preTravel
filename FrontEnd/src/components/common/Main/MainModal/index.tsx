import tw, { css } from 'twin.macro';
import { AiFillStar } from 'react-icons/ai';
import Slider from 'react-slick';

import BottomSheetWrap from '@src/components/ScheduleDetail/BottomSheet/BottomSheetWrap';

type TMarkerData = {
  address: string;
  idx: string;
  latitude: string;
  longitude: string;
  memberIdx: string;
  name: string;
  contents?: string;
  createDate?: string;
  file?: [] | null;
  star?: number;
  revisit: boolean;
};
interface MainModalProps {
  data: TMarkerData;
}

const MainModal = ({ data }: MainModalProps) => {
  return (
    <BottomSheetWrap drag={false}>
      {data.star ? (
        <>
          <Slider
            slidesToShow={1}
            lazyLoad="ondemand"
          >
            {data.file?.map(image => (
              <div>{image}</div>
            ))}
          </Slider>
          <h3 css={tw`text-body1Bold`}>{data.name}</h3>
          <div css={tw`flex items-center text-body1`}>
            <AiFillStar
              color="#ffcc00"
              css={tw`mr-1`}
            />
            {data.star}
          </div>
          <p css={tw`mt-4 text-body2`}>{data.address}</p>
        </>
      ) : (
        <>
          <h3 css={tw`text-body1Bold`}>{data.name}</h3>
          <p css={tw`mt-4 text-body2`}>{data.address}</p>
        </>
      )}
    </BottomSheetWrap>
  );
};

export default MainModal;
