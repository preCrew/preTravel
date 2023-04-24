import Button from '..';
import { IoIosArrowBack } from 'react-icons/io';
import { HiPlusSm } from 'react-icons/hi';
import { TbTrash } from 'react-icons/tb';
import { BsHeartFill } from 'react-icons/bs';
import { BsHeart } from 'react-icons/bs';
import { IoIosClose } from 'react-icons/io';

interface IconButtonProps {
  type: 'back' | 'add' | 'remove' | 'heart' | 'heartFill' | 'close';
  onClick?: () => void;
  className?: string;
}

const IconButton = ({ type, onClick, className }: IconButtonProps) => {
  return (
    <Button
      onClick={onClick}
      type="none"
      className={className}
    >
      {type === 'back' && <IoIosArrowBack size={25} />}
      {type === 'add' && <HiPlusSm size={25} />}
      {type === 'remove' && <TbTrash size={25} />}
      {type === 'heart' && <BsHeart fill="red" />}
      {type === 'heartFill' && <BsHeartFill fill="red" />}
      {type === 'close' && <IoIosClose fill="white" />}
    </Button>
  );
};

export default IconButton;
