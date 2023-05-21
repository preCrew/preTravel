import React from 'react';

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return (
    <h2 className="flex justify-center items-center px-2 m-auto rounded bg-gray4 h-30 max-w-[35%]">
      <span className="truncate text-body2Bold">😘 {title}</span>
    </h2>
  );
};

export default Title;
