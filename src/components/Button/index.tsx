import { twMerge } from 'tailwind-merge';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = ({ children, className, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={twMerge(
        className,
        'cursor-pointer rounded-md bg-blue-500 px-3 py-1 font-semibold text-white transition-colors hover:bg-blue-600'
      )}
    >
      {children}
    </button>
  );
};

export default Button;
