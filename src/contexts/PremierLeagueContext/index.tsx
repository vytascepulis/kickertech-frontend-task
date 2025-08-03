import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { PlayingEntity, PlayingEntityWithoutId } from 'types.ts';
import useFetch from 'hooks/useFetch.ts';

interface Props {
  children: ReactNode;
}

interface Context {
  data: PlayingEntity[];
  isLoading: boolean;
  error?: string;
  onAddTeam: (name: string) => void;
  onAddScore: (scoreData: IAddScoreForm) => void;
  onClearData: () => void;
}

export interface IAddScoreForm {
  homeTeamId: string;
  homeTeamScore: string;
  awayTeamId: string;
  awayTeamScore: string;
}

const PremierLeagueContext = createContext<Context>({
  data: [],
  isLoading: true,
  error: undefined,
  onAddTeam: () => {},
  onAddScore: () => {},
  onClearData: () => {},
});

const PremierLeagueProvider = ({ children }: Props) => {
  const { handleFetch } = useFetch();

  const [data, setData] = useState<PlayingEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const onAddTeam = (name: string) => {
    handleFetch<PlayingEntity[], PlayingEntityWithoutId>({
      endpoint: 'premierLeagueTeams',
      method: 'POST',
      onSuccess: setData,
      onError: setError,
      data: { name, matchesHistory: [] },
    });
  };

  const onAddScore = (data: IAddScoreForm) => {
    handleFetch<PlayingEntity[], IAddScoreForm>({
      endpoint: 'premierLeagueTeams',
      method: 'PUT',
      onSuccess: setData,
      onError: setError,
      data,
    });
  };

  const onClearData = () => {
    handleFetch({
      endpoint: 'premierLeagueTeams',
      method: 'DELETE',
      onSuccess: setData,
      onError: setError,
    });
  };

  const getTeams = () => {
    handleFetch<PlayingEntity[]>({
      endpoint: 'premierLeagueTeams',
      onSuccess: setData,
      onError: setError,
      onFinish: () => setIsLoading(false),
    });
  };

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <PremierLeagueContext.Provider
      value={{
        data,
        isLoading,
        error,
        onAddTeam,
        onAddScore,
        onClearData,
      }}
    >
      {children}
    </PremierLeagueContext.Provider>
  );
};

const usePremierLeagueContext = () => useContext(PremierLeagueContext);

export { PremierLeagueProvider, usePremierLeagueContext };
