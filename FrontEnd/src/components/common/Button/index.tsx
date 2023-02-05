interface ButtonProps {
  children: React.ReactNode;
  sizeType: 'small' | 'medium' | 'large' | 'none';
  color?: 'grey' | 'blue';
  className?: string;
  onClick?: () => void;
}

const Button = ({
  children,
  sizeType,
  color,
  className,
  onClick,
}: ButtonProps) => {
  const defaultClassName = `
    p-2 rounded-3xl 
    flex justify-center items-center`;
  const sizes = {
    small: 'w-80 h-30 text-body3',
    medium: 'w-160 h-50 text-body1Bold',
    large: `w-[calc(100%-var(--contentX))] h-50 text-body1Bold m-auto fixed bottom-0 left-0 right-0 z-[10] text-white`,
    none: '',
  };
  const colors = {
    grey: 'bg-gray3',
    blue: 'bg-primary1',
  };
  const buttonClassName = `
    ${defaultClassName} 
    ${sizes[sizeType]} 
    ${color && colors[color]}
  `;

  return (
    <button
      onClick={onClick}
      className={`${sizeType === 'none' ? '' : buttonClassName} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
