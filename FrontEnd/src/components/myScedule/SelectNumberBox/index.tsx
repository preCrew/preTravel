import filteredCardListSelector from '@src/recoil/cardList/selector';
import { useRecoilValue } from 'recoil';

interface SelectNumberBoxProps {}

const SelectNumberBox = ({}: SelectNumberBoxProps) => {
  const css = `text-body2Bold px-2 py-1 bg-black rounded text-white`;
  const selectedNumber = useRecoilValue(filteredCardListSelector);

  return <div className={css}>{selectedNumber}개 선택됨</div>;
};

export default SelectNumberBox;
