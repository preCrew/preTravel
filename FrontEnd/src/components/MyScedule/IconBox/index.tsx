import IconButton from '@src/components/common/Button/IconButton';

interface IconBoxProps {
  onClickAddButton: () => void;
  onClickRemoveButton: () => void;
}
const IconBox = ({ onClickAddButton, onClickRemoveButton }: IconBoxProps) => (
  <>
    <IconButton
      type="add"
      onClick={onClickAddButton}
    />
    <IconButton
      type="remove"
      onClick={onClickRemoveButton}
    />
  </>
);

export default IconBox;
