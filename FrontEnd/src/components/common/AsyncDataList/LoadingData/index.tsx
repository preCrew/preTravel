import tw from 'twin.macro';

interface LoadingDataProps {}

const LoadingData = ({}: LoadingDataProps) => {
  return (
    <>
      <div css={tw`skeleton-data `} />
      {/* <div css={tw`border-b-2 h-50 pt-5 psb-5 pl-4 pr-4`}>
        <div css={tw`w-[50%] h-13 bg-skeleton animate-skeletonData`} />
      </div> */}
    </>
  );
};

export default LoadingData;
