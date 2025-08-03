import axios from 'axios';
import { useState } from 'react';

interface HandleFetchParams<TRes, TData> {
  endpoint: string;
  onSuccess?: (data: TRes) => void;
  onError?: (err: string) => void;
  onFinish?: () => void;
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
  data?: TData;
}

const useFetch = <TRes>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TRes | null>(null);

  const updateData = (data: TRes) => setData(data);

  const handleFetch = async <TData = undefined>({
    endpoint,
    onSuccess,
    onError,
    onFinish,
    method = 'GET',
    data,
  }: HandleFetchParams<TRes, TData>) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await axios<TRes>({
        method,
        url: `${import.meta.env.VITE_ENDPOINT_URL}/${endpoint}`,
        data,
      });
      onSuccess?.(res.data);
      setData(res.data);
    } catch (err) {
      let message = 'Unknown error';

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      onError?.(message);
      setError(message);
    } finally {
      onFinish?.();
      setIsLoading(false);
    }
  };

  return { handleFetch, isLoading, error, data, updateData };
};

export default useFetch;
