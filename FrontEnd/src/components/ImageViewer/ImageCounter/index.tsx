import tw from 'twin.macro';

interface ImageCounterProps {
  now: number;
  max: number;
}

const ImageCounter = ({ now, max }: ImageCounterProps) => {
  return max > 1 ? (
    <div
      css={tw`absolute w-50 bg-black text-white text-body4Bold text-center right-3 top-3 rounded-full p-1`}
    >
      {now} / {max}
    </div>
  ) : null;
};

export default ImageCounter;
