import Button from '..';
import { IoIosArrowBack } from 'react-icons/io';
import { HiPlusSm } from 'react-icons/hi';
import { TbTrash } from 'react-icons/tb';
import { BsHeartFill } from 'react-icons/bs';
import { BsHeart } from 'react-icons/bs';
import { Interpolation, Theme } from '@emotion/react';

interface IconButtonProps {
  type: 'back' | 'add' | 'remove' | 'heart' | 'heartFill';
  onClick?: () => void;
  css?: Interpolation<Theme>;
}

const IconButton = ({ type, onClick, css }: IconButtonProps) => {
  return (
    <>
      <Button
        onClick={onClick}
        type="none"
        css={css}
      >
        {type === 'back' && <IoIosArrowBack size={25} />}
        {type === 'add' && <HiPlusSm size={25} />}
        {type === 'remove' && <TbTrash size={25} />}
        {type === 'heart' && <BsHeart fill="red" />}
        {type === 'heartFill' && <BsHeartFill fill="red" />}
      </Button>
    </>
  );
};

export default IconButton;
