import IconButton from '../Button/IconButton';

interface TopBarProps {
  onClickBackButton?: () => void;
  children: React.ReactNode;
}

const TopBar = ({ onClickBackButton, children }: TopBarProps) => {
  const css = `
    w-full h-70 pl-4
    flex items-center
    bg-white
  `;
  return (
    <div className={css}>
      <IconButton
        type="back"
        onClick={onClickBackButton}
      />
      {children}
    </div>
  );
};

export default TopBar;
