import tw, { css } from 'twin.macro';
import { AiFillStar } from 'react-icons/ai';
import Slider from 'react-slick';

import BottomSheetWrap from '@src/components/ScheduleDetail/BottomSheet/BottomSheetWrap';
import { useState } from 'react';

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
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current: any, next: any) => setCurrentSlide(next),
  };

  return (
    <BottomSheetWrap
      drag={false}
      snapIdx={2}
    >
      {data.star ? (
        <div css={tw`flex`}>
          {data.file?.length && (
            <div css={tw`w-[55%] mr-2 relative h-175 overflow-hidden`}>
              <Slider
                {...settings}
                css={tw`w-[100%]`}
                className="main-modal__slider"
              >
                {data.file?.map((image: any) => (
                  <div css={tw``}>
                    {/* <img src={image.fileDir} />{' '} */}
                    <img
                      src={image.fileDir}
                      css={tw`object-cover w-full h-full`}
                    />
                  </div>
                ))}
              </Slider>
              <span
                css={tw`absolute bottom-1 right-1 z-10 text-white text-body4Bold p-1  before:(content-[''] -z-1 rounded absolute left-0 top-0 w-full h-full bg-black opacity-50)`}
              >
                {currentSlide + 1}/{data.file?.length}
              </span>
            </div>
          )}
          <div css={tw`w-[40%]`}>
            <h3 css={tw`text-body1Bold line-clamp-2`}>{data.name}</h3>
            <div css={tw`flex items-center text-body1`}>
              <AiFillStar
                color="#ffcc00"
                css={tw`mr-1`}
              />
              {data.star}
            </div>
            <p css={tw`mt-4 text-body2`}>{data.address}</p>
          </div>
        </div>
      ) : (
        <>
          <h3 css={tw`text-body1Bold line-clamp-2`}>{data.name}</h3>
          <p css={tw`mt-4 text-body2`}>{data.address}</p>
        </>
      )}
    </BottomSheetWrap>
  );
};

export default MainModal;
