import axios from 'axios';

interface HandleFetchParams<IData> {
  endpoint: string;
  onSuccess: (data: IData) => void;
  onError: (err: string) => void;
  onFinish?: () => void;
  method?: 'POST' | 'GET' | 'PUT';
}

const useFetch = () => {
  const handleFetch = async <IData>({
    endpoint,
    onSuccess,
    onError,
    onFinish,
    method = 'GET',
  }: HandleFetchParams<IData>) => {
    try {
      const res = await axios<IData>({
        method,
        url: `${import.meta.env.VITE_ENDPOINT_URL}/${endpoint}`,
      });
      onSuccess(res.data);
    } catch (err) {
      let message = 'Unknown error';

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      onError(message);
    } finally {
      onFinish?.();
    }
  };

  return { handleFetch };
};

export default useFetch;
