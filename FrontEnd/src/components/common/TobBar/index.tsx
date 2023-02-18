import tw from 'twin.macro';
import IconButton from '../Button/IconButton';

interface TopBarProps {
  onClickBackButton?: () => void;
  children: React.ReactNode;
}

const TopBar = ({ onClickBackButton, children }: TopBarProps) => {
  const css = tw`
    w-full h-70 pl-4
    flex items-center
    bg-white
    relative
  `;
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
