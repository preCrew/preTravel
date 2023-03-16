import tw from 'twin.macro';

interface TopTextProps {
  children: React.ReactNode;
}

const TopText = ({ children }: TopTextProps) => {
  return (
    <div css={tw`w-full absolute text-center text-h4Bold pointer-events-none`}>
      {children}
    </div>
  );
};

export default TopText;
