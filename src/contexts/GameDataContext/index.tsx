import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { PlayingEntity, PlayingEntityWithoutId } from 'types.ts';
import useFetch from 'hooks/useFetch.ts';
import type {
  Context,
  GameType,
  IAddScoreForm,
} from 'contexts/GameDataContext/types.ts';

interface Props {
  children: ReactNode;
}

const GameDataContext = createContext<Context>({
  data: { PremierLeague: [], EuroBasket: [], Wimbledon: [] },
  isLoading: true,
  error: {
    PremierLeague: undefined,
    EuroBasket: undefined,
    Wimbledon: undefined,
  },
  onAddEntity: () => {},
  onAddScore: () => {},
  onClearData: () => {},
});

const GameDataProvider = ({ children }: Props) => {
  const { handleFetch } = useFetch();

  const [data, setData] = useState<Context['data']>({
    PremierLeague: [],
    EuroBasket: [],
    Wimbledon: [],
  });

  const [isLoading, setIsLoading] = useState<Context['isLoading']>(true);

  const [error, setError] = useState<Context['error']>({
    PremierLeague: undefined,
    EuroBasket: undefined,
    Wimbledon: undefined,
  });

  const onAddEntity: Context['onAddEntity'] = (game, name) => {
    handleFetch<PlayingEntity[], PlayingEntityWithoutId & { game: GameType }>({
      endpoint: 'entities',
      method: 'POST',
      onSuccess: (resData) =>
        setData((prevState) => ({ ...prevState, [game]: resData })),
      onError: (resError) =>
        setError((prevState) => ({ ...prevState, [game]: resError })),
      data: { game, name },
    });
  };

  const onAddScore: Context['onAddScore'] = (game, data: IAddScoreForm) => {
    handleFetch<PlayingEntity[], IAddScoreForm & { game: GameType }>({
      endpoint: 'score',
      method: 'PUT',
      onSuccess: (resData) =>
        setData((prevState) => ({ ...prevState, [game]: resData })),
      onError: (resError) =>
        setError((prevState) => ({ ...prevState, [game]: resError })),
      data: { ...data, game },
    });
  };

  const onClearData: Context['onClearData'] = (game) => {
    handleFetch({
      endpoint: `entities/${game}`,
      method: 'DELETE',
      onSuccess: (resData) =>
        setData((prevState) => ({ ...prevState, [game]: resData })),
    });
  };

  const getTeams = () => {
    handleFetch<Context['data']>({
      endpoint: 'entities',
      onSuccess: setData,
      onFinish: () => setIsLoading(false),
    });
  };

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <GameDataContext.Provider
      value={{
        data,
        isLoading,
        error,
        onAddEntity,
        onAddScore,
        onClearData,
      }}
    >
      {children}
    </GameDataContext.Provider>
  );
};

const usePremierLeagueContext = () => useContext(GameDataContext);

export { GameDataProvider, usePremierLeagueContext };
