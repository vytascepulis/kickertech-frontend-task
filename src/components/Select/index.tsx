interface Props {
  options: { value: string; label: string }[];
  selected?: string;
  placeholder?: string;
}

const Select = ({ options, selected, placeholder }: Props) => {
  return (
    <select
      defaultValue=''
      className='grow rounded-md border border-gray-300 bg-neutral-100 px-2 py-1 font-semibold'
    >
      {placeholder && (
        <option value='' disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          selected={selected === option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
