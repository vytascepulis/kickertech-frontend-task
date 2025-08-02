interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = ({ placeholder, children, ...rest }: Props) => {
  return (
    <select
      {...rest}
      value={rest.value || ''}
      className='grow rounded-md border border-gray-300 bg-neutral-100 px-2 py-1 font-semibold'
    >
      {placeholder && (
        <option value='' disabled>
          {placeholder}
        </option>
      )}
      {children}
    </select>
  );
};

export default Select;
