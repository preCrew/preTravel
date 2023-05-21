interface CancelBtnProps {
  onClick?: () => void;
}

const CancelBtn = ({ onClick }: CancelBtnProps) => {
  return (
    <button
      type="button"
      className="mr-3 text-body1Bold"
      onClick={onClick}
    >
      취소
    </button>
  );
};

export default CancelBtn;
