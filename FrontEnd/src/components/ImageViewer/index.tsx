import { useState } from 'react';

import tw from 'twin.macro';

import Row from '../common/FlexBox/Row';
import Slider from '../common/Slider';
import ImageCounter from './ImageCounter';
import { IReviewFile } from '@src/hooks/react-query/useGetReview';

interface ImageViewerProps {
  images?: IReviewFile[]; // 이미지 주소 url들
}

const ImageViewer = ({ images }: ImageViewerProps) => {
  const [imageIndex, setImageIndex] = useState({
    now: 1,
    max: images?.length ?? 0,
  });

  const handleSliderDraggingLeft = () => {
    setImageIndex(prev => ({ ...prev, now: prev.now - 1 }));
  };
  const handleSliderDraggingRight = () => {
    setImageIndex(prev => ({ ...prev, now: prev.now + 1 }));
  };

  return (
    <>
      {images?.length && images.length > 0 ? (
        <div css={tw`relative w-full pb-[100%] rounded-xl`}>
          <div css={tw`absolute w-full h-full rounded-xl`}>
            <>
              <Slider
                itemNum={images?.length ?? 0}
                onMovedLeft={handleSliderDraggingLeft}
                onMovedRight={handleSliderDraggingRight}
              >
                <Row css={tw`w-h-full`}>
                  {images?.map(image => (
                    <img
                      key={image.fileDir}
                      src={image.fileDir}
                      css={tw`rounded-xl`}
                    />
                  ))}
                </Row>
              </Slider>
              <ImageCounter
                now={imageIndex.now}
                max={imageIndex.max}
              />
            </>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default ImageViewer;

// 1개 천원
// 1+1 = 2개 1000/2 = 500
// 2+1 = 3개 2000/3 = 666
