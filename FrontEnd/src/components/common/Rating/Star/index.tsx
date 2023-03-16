import { AiFillStar } from 'react-icons/ai';
import { css } from 'twin.macro';

interface StarProps {
  onClick?: () => void;
  isFilled?: boolean;
  size: number;
  canClick?: boolean;
}
const getSize = (size: number) => (size / 16) * 4 + 'rem';

const Star = ({ onClick, isFilled, size, canClick }: StarProps) => {
  return (
    <div
      css={
        canClick &&
        css`
          cursor: pointer;
        `
      }
    >
      {isFilled ? (
        <AiFillStar
          size={getSize(size)}
          onClick={onClick}
          color="#5698F3"
        />
      ) : (
        <AiFillStar
          size={getSize(size)}
          onClick={onClick}
          color="#787878"
        />
      )}
    </div>
  );
};

export default Star;
