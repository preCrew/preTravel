import tw, { TwStyle } from 'twin.macro';

export type Data = {
  id: string;
  [key: string]: string;
};

interface DataListProps<T extends Data> {
  data: T[];
  dataName: string;
  onClickData?: (data: Data) => void;
}

const DataList = <T extends Data>({
  data,
  dataName,
  onClickData,
}: DataListProps<T>) => {
  console.log(data);
  return (
    <div css={tw`text-body1 select-none cursor-pointer`}>
      {data.map(item => (
        <div
          key={`${item.id}`}
          onClick={() => onClickData && onClickData(item)}
        >
          <div css={tw`border-b-2 h-40 mt-5 mb-5 pl-4 pr-4`}>
            {item[dataName]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataList;
