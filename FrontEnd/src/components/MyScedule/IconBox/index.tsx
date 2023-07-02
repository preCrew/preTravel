import IconButton from '@src/components/common/Button/IconButton';

interface IconBoxProps {
  onClickAddButton: () => void;
  onClickEditButton: () => void;
  onClickRemoveButton: () => void;
}
const IconBox = ({
  onClickAddButton,
  onClickEditButton,
  onClickRemoveButton,
}: IconBoxProps) => (
  <>
    <IconButton
      type="add"
      onClick={onClickAddButton}
    />
    <IconButton
      type="edit"
      onClick={onClickEditButton}
    />
    <IconButton
      type="remove"
      onClick={onClickRemoveButton}
    />
  </>
);

export default IconBox;
