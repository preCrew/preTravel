import tw from 'twin.macro';

export type Data<T> = {
  idx: string;
  showData: unknown;
  data?: unknown;
};

interface DataListProps<T> {
  data: Data<T>[];
  onClickData?: (data: Data<T>) => void;
}

const DataList = ({ data, onClickData }: DataListProps<unknown>) => {
  return (
    <div css={tw`text-body1 select-none cursor-pointer`}>
      {data.map(item => (
        <div
          key={`${item.idx}`}
          onClick={() => onClickData && onClickData(item)}
        >
          <div css={tw`border-b-2 h-40 mt-5 mb-5 pl-4 pr-4`}>
            {item.showData as string}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataList;
