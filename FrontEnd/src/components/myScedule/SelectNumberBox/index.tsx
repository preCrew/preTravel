import filteredCardListSelector from '@src/recoil/cardList/selector';
import { useRecoilValue } from 'recoil';

interface SelectNumberBoxProps {}

const SelectNumberBox = ({}: SelectNumberBoxProps) => {
  const css = `text-body1Bold`;
  const selectedNumber = useRecoilValue(filteredCardListSelector);

  return <div className={css}>{selectedNumber}개 선택됨</div>;
};

export default SelectNumberBox;
