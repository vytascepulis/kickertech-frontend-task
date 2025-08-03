import axios from 'axios';

interface HandleFetchParams<TRes, TData> {
  endpoint: string;
  onSuccess?: (data: TRes) => void;
  onError?: (err: string) => void;
  onFinish?: () => void;
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
  data?: TData;
}

const useFetch = () => {
  const handleFetch = async <TRes, TData = undefined>({
    endpoint,
    onSuccess,
    onError,
    onFinish,
    method = 'GET',
    data,
  }: HandleFetchParams<TRes, TData>) => {
    try {
      const res = await axios<TRes>({
        method,
        url: `${import.meta.env.VITE_ENDPOINT_URL}/${endpoint}`,
        data,
      });
      onSuccess?.(res.data);
    } catch (err) {
      let message = 'Unknown error';

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      onError?.(message);
    } finally {
      onFinish?.();
    }
  };

  return { handleFetch };
};

export default useFetch;
