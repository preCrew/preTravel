import tw from 'twin.macro';
import IconButton from '../Button/IconButton';

interface TopBarProps {
  onClickBackButton?: () => void;
  children: React.ReactNode;
}

const TopBar = ({ onClickBackButton, children }: TopBarProps) => {
  const css = tw`
    w-full h-70
    flex items-center
    bg-white
  `;
  return (
    <div css={css}>
      <div css={tw`pl-4`}>
        <IconButton
          type="back"
          onClick={onClickBackButton}
        />
      </div>

      {children}
    </div>
  );
};

export default TopBar;
