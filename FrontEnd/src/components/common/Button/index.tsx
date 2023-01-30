interface ButtonProps {
  children: React.ReactNode;
  type: 'small' | 'medium' | 'large' | 'none';
  color?: 'grey' | 'blue';
  className?: string;
  onClick?: () => void;
}

const Button = ({ children, type, color, className, onClick }: ButtonProps) => {
  const defaultClassName = `
    p-2 rounded-3xl 
    flex justify-center items-center`;
  const sizes = {
    small: 'w-80 h-30 text-body3',
    medium: 'w-160 h-50 text-body1Bold',
    large: `w-[calc(100%-var(--contentX))] h-50 text-body1Bold z-[10] text-white`,
    none: '',
  };
  const colors = {
    grey: 'bg-gray3',
    blue: 'bg-primary1',
  };
  const buttonClassName = `
    ${defaultClassName} 
    ${sizes[type]} 
    ${color && colors[color]}
  `;

  return (
    <button
      onClick={onClick}
      className={`${type === 'none' ? '' : buttonClassName} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
