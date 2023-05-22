interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return (
    <h2 className="m-auto flex h-30 max-w-[35%] items-center justify-center rounded bg-gray4 px-2">
      <span className="truncate text-body2Bold">😘 {title}</span>
    </h2>
  );
};

export default Title;
