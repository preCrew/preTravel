import tw from 'twin.macro';

interface DataListProps {
  children: React.ReactNode;
}

const DataList = ({ children }: DataListProps) => {
  return <div css={tw`text-body1 select-none cursor-pointer`}>{children}</div>;
};

export default DataList;
