// 가로줄 = index % 2
// 세로줄 = Math.floor(index / 2) % 2
// 계산식 = (index % 2 + Math.floor(index / 2) % 2) %2

import tw from 'twin.macro';

const getRow = (index: number) => index % 2;
const getCol = (index: number) => Math.floor(index / 2) % 2;
const isRedLocation = (index: number) =>
  (getRow(index) + getCol(index)) % 2 ? true : false;

const block = `
  relactive grow shrink 
  select-none cursor-pointer
`;

const blockInner = (url: string, index: number) => tw`
  rounded px-3.5 py-5 relative  h-[23vh]
  before:(content-[''] absolute left-0 top-0 w-full h-full bg-black opacity-20 rounded)
`;

// bg-cover bg-[url('${url}')]2
const content = `
  text-white text-center flex flex-col h-full relative z-[5]
`;
const title = `
  text-h5Bold
  line-clamp-2
`;
const region = `
  text-body2Bold mt-2
  line-clamp-2  
`;
const date = `
  break-words text-body3 w-[55%] mt-auto mx-auto text-center
`;
const Card = {
  block,
  blockInner,
  content,
  title,
  region,
  date,
};

const SkeletonBlockInner = tw`
rounded px-3.5 py-5 relative  h-[23vh] z-10
before:(content-[''] absolute left-0 top-0 w-h-full bg-gray-200 rounded)
animate-pulse
`;
const SkeletonContent = tw`
  flex flex-col w-full h-full relative z-[5] items-center
`;
const SkeletonTitle = tw`
  text-h5Bold bg-black opacity-10 rounded-md w-[80%] h-[13%]
`;
const SkeletonRegion = tw`
  text-body2Bold mt-2 bg-black opacity-10 rounded-md w-[50%] h-[10%]
`;
const SkeletonDate = tw`
 text-body3 w-[70%] h-[20%] bg-black opacity-10 rounded-md mt-auto
`;
const SkeletonCard = {
  Inner: SkeletonBlockInner,
  Content: SkeletonContent,
  Title: SkeletonTitle,
  Region: SkeletonRegion,
  Date: SkeletonDate,
};

export { Card, SkeletonCard };
