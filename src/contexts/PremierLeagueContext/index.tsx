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
});

const PremierLeagueProvider = ({ children }: Props) => {
  const { handleFetch } = useFetch();

  const [data, setData] = useState<PlayingEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const onAddTeam = (name: string) => {
    handleFetch<PlayingEntity, PlayingEntityWithoutId>({
      endpoint: 'premierLeagueTeams',
      method: 'POST',
      onSuccess: (data) => setData((prevState) => [...prevState, data]),
      onError: setError,
      data: { name, matchesHistory: [] },
    });
  };

  const onAddScore = ({
    homeTeamId,
    homeTeamScore,
    awayTeamId,
    awayTeamScore,
  }: IAddScoreForm) => {
    // const parseMatchResult = homeTeamScore > awayTeamScore ?
    // handleFetch<PlayingEntity, Partial<PlayingEntity>>({
    //   endpoint: 'premierLeagueTeams',
    //   method: 'PUT',
    //   onSuccess: (data) => console.log('PUT: ', data),
    //   // onError: setError,
    //   data: { id: homeTeamId, matchesHistory: [{playedVersus: awayTeamId, result: }] },
    // });
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
      }}
    >
      {children}
    </PremierLeagueContext.Provider>
  );
};

const usePremierLeagueContext = () => useContext(PremierLeagueContext);

export { PremierLeagueProvider, usePremierLeagueContext };
