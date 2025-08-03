const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;

  return <div className='mt-2 text-sm font-bold text-red-500'>{message}</div>;
};

export default ErrorMessage;
