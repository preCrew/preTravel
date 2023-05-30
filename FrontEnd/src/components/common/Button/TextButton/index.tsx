interface indexProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const TextButton = ({ children, onClick, className }: indexProps) => {
  return (
    <button
      onClick={onClick}
      css={className}
    >
      {children}
    </button>
  );
};

export default TextButton;
