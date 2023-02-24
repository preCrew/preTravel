import { Interpolation, Theme } from '@emotion/react';
import tw from 'twin.macro';

interface DataListProps {
  children: React.ReactNode;
  css: Interpolation<Theme>;
}

const DataList = ({ children }: DataListProps) => {
  return <div css={tw`text-body1 select-none cursor-pointer `}>{children}</div>;
};

export default DataList;
