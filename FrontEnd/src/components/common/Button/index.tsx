interface ButtonProps {
  children: React.ReactNode;
  type: 'small' | 'medium' | 'large' | 'none';
  color?: 'grey' | 'blue';
  className?: string;
  onClick?: () => void;
  noStyle?: boolean;
}

const Button = ({
  children,
  type,
  color,
  className,
  onClick,
  noStyle,
}: ButtonProps) => {
  const defaultClassName = `
    p-2 rounded-3xl 
    flex justify-center items-center`;
  const sizes = {
    small: 'w-80 h-30 text-body3',
    medium: 'w-160 h-50 text-body1Bold',
    large: 'w-330 h-50 text-body1Bold',
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
    ${className} 
  `;

  return (
    <button
      onClick={onClick}
      className={noStyle ? '' : buttonClassName}
    >
      {children}
    </button>
  );
};

export default Button;
