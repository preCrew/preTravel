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
        {images?.length && images.length > 0 && (
          <>
            <Slider
              itemNum={images?.length ?? 0}
              onMovedLeft={handleSliderDraggingLeft}
              onMovedRight={handleSliderDraggingRight}
            >
              <Row>
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
        )}
      </div>
    </div>
  );
};

export default ImageViewer;
