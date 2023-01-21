const block = (index: number) => `
  relactive w-170 h-170 rounded-3xl m-3
  ${index % 2 === 0 ? 'bg-red1' : 'bg-green1'}
`;
const blockInner = (url: string) => `
  w-full h-full rounded-3xl
  bg-[rgba(0,0,0,0.26)]
  text-white text-center
  bg-cover bg-[url('${url}')]
`;
const flexBox = `
  w-full h-full
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
