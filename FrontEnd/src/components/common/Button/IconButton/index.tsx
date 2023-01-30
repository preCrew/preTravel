import Button from '..';
import { IoIosArrowBack } from 'react-icons/io';
import { HiPlusSm } from 'react-icons/hi';
import { TbTrash } from 'react-icons/tb';

interface IconButtonProps {
  type: 'back' | 'add' | 'remove';
  onClick?: () => void;
}

const IconButton = ({ type, onClick }: IconButtonProps) => {
  return (
    <>
      <Button
        onClick={onClick}
        type="none"
      >
        {type === 'back' && <IoIosArrowBack size={25} />}
        {type === 'add' && <HiPlusSm size={25} />}
        {type === 'remove' && <TbTrash size={25} />}
      </Button>
    </>
  );
};

export default IconButton;
