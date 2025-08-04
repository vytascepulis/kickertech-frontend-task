import { twMerge } from 'tailwind-merge';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  color?: 'orange' | 'green' | 'purple';
  loading?: boolean;
  size?: 'lg';
}

const Button = ({
  children,
  className,
  color,
  loading,
  size,
  ...rest
}: Props) => {
  return (
    <button
      {...rest}
      disabled={rest.disabled || loading}
      className={twMerge(
        className,
        'cursor-pointer rounded-md bg-blue-500 px-3 py-1 font-semibold text-white transition-colors hover:bg-blue-600',
        color === 'orange' && 'bg-orange-500 hover:bg-orange-600',
        color === 'green' && 'bg-green-800 hover:bg-green-900',
        color === 'purple' && 'bg-purple-950 hover:bg-purple-900',
        size === 'lg' && 'py-2 text-xl'
      )}
    >
      {children}
    </button>
  );
};

export default Button;
