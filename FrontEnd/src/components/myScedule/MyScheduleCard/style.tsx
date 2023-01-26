// 가로줄 = index % 2
// 세로줄 = Math.floor(index / 2) % 2
// 계산식 = (index % 2 + Math.floor(index / 2) % 2) %2

const getRow = (index: number) => index % 2;
const getCol = (index: number) => Math.floor(index / 2) % 2;
const isRedLocation = (index: number) =>
  (getRow(index) + getCol(index)) % 2 ? true : false;

const block = `
  relactive grow shrink 
  select-none cursor-pointer
`;

const blockInner = (url: string, index: number) => `
  rounded px-3.5 py-5 relative 
  min-w-[30vw] min-h-[23vh] h-full
  before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-black before:opacity-20 before:rounded
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

export default Card;
