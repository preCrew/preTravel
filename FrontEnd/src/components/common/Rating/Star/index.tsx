import { AiFillStar } from 'react-icons/ai';
import tw from 'twin.macro';

interface StarProps {
  onClick?: () => void;
  isFilled?: boolean;
}
const size = '40px';

const Star = ({ onClick, isFilled }: StarProps) => {
  return (
    <div css={tw`cursor-pointer`}>
      {isFilled ? (
        <AiFillStar
          size={size}
          onClick={onClick}
          color="#5698F3"
        />
      ) : (
        <AiFillStar
          size={size}
          onClick={onClick}
          color="#787878"
        />
      )}
    </div>
  );
};

export default Star;
