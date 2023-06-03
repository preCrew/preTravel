import tw from 'twin.macro';

interface DataProps {
  children: React.ReactNode;
  onClickData?: (data: unknown) => void;
}

const Data = ({ children, onClickData }: DataProps) => {
  return (
    <div
      css={tw`border-b-2 h-40 mt-5 mb-5 pl-4 pr-4`}
      onClick={onClickData}
    >
      {children}
    </div>
  );
};

export default Data;
