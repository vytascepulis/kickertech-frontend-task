import { twMerge } from 'tailwind-merge';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  color?: 'orange';
  loading?: boolean;
}

const Button = ({ children, className, color, loading, ...rest }: Props) => {
  return (
    <button
      {...rest}
      disabled={rest.disabled || loading}
      className={twMerge(
        className,
        'cursor-pointer rounded-md bg-blue-500 px-3 py-1 font-semibold text-white transition-colors hover:bg-blue-600',
        color === 'orange' && 'bg-orange-500 hover:bg-orange-600'
      )}
    >
      {children}
    </button>
  );
};

export default Button;
