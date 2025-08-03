interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
}

const Select = ({ placeholder, children, ...rest }: Props) => {
  return (
    <select
      {...rest}
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
