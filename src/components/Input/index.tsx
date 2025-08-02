type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ ...rest }: Props) => {
  return (
    <input
      {...rest}
      className='grow rounded-md border border-gray-300 bg-white px-3 py-1'
    />
  );
};

export default Input;
