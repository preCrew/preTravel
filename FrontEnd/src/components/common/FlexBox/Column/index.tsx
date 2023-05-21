import tw, { css } from 'twin.macro';

interface ColumnProps {
  gap?: number | string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const pxToRem = (px: number | string) => `${+px / 16}rem`;

const Column = ({ gap, children, className, onClick }: ColumnProps) => {
  return (
    <div
      css={[
        tw`flex flex-col`,
        css`
          gap: ${pxToRem(gap ?? 0)};
        `,
      ]}
      className={className}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Column;
