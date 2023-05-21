import { css } from '@emotion/react';

export type ButtonColors =
  | 'primary1'
  | 'primary2'
  | 'primary3'
  | 'gray1'
  | 'gray2'
  | 'gray3'
  | 'gray4'
  | 'gray5'
  | 'red1'
  | 'green1';

interface ButtonProps {
  children: React.ReactNode;
  type: 'small' | 'medium' | 'large' | 'none';
  color?: ButtonColors;
  className?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ children, type, color, className, onClick }: ButtonProps) => {
  const sizes = {
    small: 'w-80 h-30 text-body3',
    medium: 'w-160 h-50 text-body1Bold',
    large: `w-[calc(100%)] h-50 text-body1Bold z-[10] text-white`,
    none: '',
  };

  const defaultClassName = `
    p-2 rounded-3xl 
    flex justify-center items-center
    ${sizes[type]}`;

  return (
    <button
      onClick={onClick}
      className={`
        ${type === 'none' ? '' : defaultClassName} 
        ${className}
      `}
      css={css`
        background: var(--${color});
      `}
    >
      {children}
    </button>
  );
};

export default Button;
