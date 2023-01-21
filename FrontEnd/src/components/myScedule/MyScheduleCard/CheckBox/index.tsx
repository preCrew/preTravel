interface CheckBoxProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
}

const CheckBox = ({ onChange, isChecked }: CheckBoxProps) => {
  const outBox = `
    absolute w-24 h-24 ml-3 mt-3 
  `;
  const checkbox = `
    w-24 h-24 opacity-60 cursor-pointer
  `;
  return (
    <div className={outBox}>
      <input
        type="checkbox"
        className={checkbox}
        onChange={onChange}
        checked={isChecked}
      />
    </div>
  );
};

export default CheckBox;
