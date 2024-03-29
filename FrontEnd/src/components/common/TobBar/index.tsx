import tw from 'twin.macro';
import IconButton from '../Button/IconButton';

interface TopBarProps {
  onClickBackButton?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const TopBar = ({ onClickBackButton, children, className }: TopBarProps) => {
  const css = tw`fixed top-0 left-0 z-50 flex items-center w-full px-5 bg-white h-70`;
  return (
    <div css={css}>
      <IconButton
        type="back"
        onClick={onClickBackButton}
      />

      {children}
    </div>
  );
};

export default TopBar;
