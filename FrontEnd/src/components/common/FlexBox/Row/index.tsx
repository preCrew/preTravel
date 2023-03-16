import tw, { css } from 'twin.macro';

interface RowProps {
  gap?: number | string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const pxToRem = (px: number | string) => `${(+px / 16) * 4}rem`;

const Row = ({ gap, children, className, onClick }: RowProps) => {
  return (
    <div
      css={[
        tw`flex flex-row`,
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

export default Row;
