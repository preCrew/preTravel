import tw, { css } from 'twin.macro';

import { FcAddImage } from 'react-icons/fc';

import Column from '../../FlexBox/Column';
import IconButton from '../../Button/IconButton';
interface ImageBoxProps {
  onClick?: () => void;
  onClose?: () => void;
  type: 'add' | 'image' | 'loading';
  imgNum?: number;
  imgSrc?: string;
}

const ImageBox = ({
  onClick,
  type,
  imgNum,
  imgSrc,
  onClose,
}: ImageBoxProps) => {
  const selectButton = (
    <div
      onMouseUp={onClick}
      css={[
        tw`cursor-pointer pointer-events-auto `,
        tw`w-100 h-100 border border-gray1 rounded-lg flex-with-center `,
      ]}
    >
      <Column css={tw`items-center justify-center gap-1 `}>
        <FcAddImage size="20px" />
        <span css={tw`text-body4Bold`}>{imgNum} / 10</span>
      </Column>
    </div>
  );
  const image = (
    <div css={tw`w-100 h-100 relative `}>
      <img
        src={imgSrc}
        css={tw`w-full h-full object-fill rounded-lg `}
      />
      <div
        onMouseUp={onClose}
        css={tw`absolute top-1 right-1 bg-black rounded-full w-20 h-20 flex-with-center pointer-events-auto`}
      >
        <IconButton type="close" />
      </div>
    </div>
  );

  const loading = <div>loading...</div>;

  const render = {
    add: selectButton,
    image: image,
    loading: loading,
  };

  return render[type];
};

export default ImageBox;
