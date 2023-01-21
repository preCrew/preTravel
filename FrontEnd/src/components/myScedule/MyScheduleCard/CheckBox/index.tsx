interface CheckBoxProps {
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = ({ onClick }: CheckBoxProps) => {
  const outBox = `
    absolute w-24 h-24 ml-3 mt-3
  `;
  const checkbox = `
    w-24 h-24 opacity-60
  `;
  return (
    <div className={outBox}>
      <input
        type="checkbox"
        className={checkbox}
        onChange={onClick}
      />
    </div>
  );
};

export default CheckBox;
