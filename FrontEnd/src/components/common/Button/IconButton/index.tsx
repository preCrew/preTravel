import Button from '..';

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const IconButton = ({ onClick, children }: IconButtonProps) => (
  <Button
    type="none"
    onClick={onClick}
    noStyle
  >
    {children}
  </Button>
);

export default IconButton;
