// 가로줄 = index % 2
// 세로줄 = Math.floor(index / 2) % 2
// 계산식 = (index % 2 + Math.floor(index / 2) % 2) %2
const getRow = (index: number) => index % 2;
const getCol = (index: number) => Math.floor(index / 2) % 2;
const isRedLocation = (index: number) =>
  (getRow(index) + getCol(index)) % 2 ? true : false;

const block = `
  relactive grow shrink
`;

const blockInner = (url: string, index: number) => `
  w-170 h-170 rounded-3xl
  text-white text-center
  bg-cover bg-[url('${url}')]
  ${isRedLocation(index) ? 'bg-red1' : 'bg-green1'}
`;
const flexBox = `
  w-full h-full rounded-3xl
  bg-[rgba(0,0,0,0.26)]
  flex flex-col justify-end items-center
`;
const title = `
  w-140 h-50 text-h5Bold
  line-clamp-2
`;
const region = `
  h-40
`;
const date = `
  w-90 h-60 break-words
`;
const Card = {
  block,
  blockInner,
  flexBox,
  title,
  region,
  date,
};

export default Card;
