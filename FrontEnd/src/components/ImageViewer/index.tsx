import { useState } from 'react';

import tw from 'twin.macro';

import Row from '../common/FlexBox/Row';
import Slider from '../common/Slider';
import ImageCounter from './ImageCounter';

interface ImageViewerProps {
  images?: string[]; // 이미지 주소 url들
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
    <div css={tw`relative w-full pb-[100%] rounded-xl`}>
      <div css={tw`absolute w-full h-full rounded-xl`}>
        {images?.length && images.length > 0 ? (
          <>
            <Slider
              itemNum={images?.length ?? 0}
              onMovedLeft={handleSliderDraggingLeft}
              onMovedRight={handleSliderDraggingRight}
            >
              <Row css={tw`w-h-full`}>
                {images?.map(image => (
                  <img
                    key={image}
                    src={image}
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
        ) : (
          <div>등록된 이미지가 없어요!</div>
        )}
      </div>
    </div>
  );
};

export default ImageViewer;

// 1개 천원
// 1+1 = 2개 1000/2 = 500
// 2+1 = 3개 2000/3 = 666
