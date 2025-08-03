import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { PlayingEntity } from 'types.ts';
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
  homeTeamName: string;
  homeTeamScore: string;
  awayTeamName: string;
  awayTeamScore: string;
}

const PremierLeagueContext = createContext<Context>({
  data: [],
  isLoading: true,
  error: undefined,
  onAddTeam: () => {},
  onAddScore: () => {},
});

const rawData: PlayingEntity[] = [
  {
    name: 'Liverpool',
    matchesHistory: [
      { playedVersus: 'Chelsea', result: 'WIN' },
      { playedVersus: 'Man U', result: 'LOSE' },
      { playedVersus: 'Arsenal', result: 'WIN' },
    ],
  },
  {
    name: 'Man U',
    matchesHistory: [
      { playedVersus: 'Arsenal', result: 'WIN' },
      { playedVersus: 'Liverpool', result: 'WIN' },
      { playedVersus: 'Chelsea', result: 'WIN' },
    ],
  },
  {
    name: 'Arsenal',
    matchesHistory: [
      { playedVersus: 'Man U', result: 'LOSE' },
      { playedVersus: 'Chelsea', result: 'DRAW' },
      { playedVersus: 'Liverpool', result: 'LOSE' },
    ],
  },
  {
    name: 'Chelsea',
    matchesHistory: [
      { playedVersus: 'Liverpool', result: 'LOSE' },
      { playedVersus: 'Arsenal', result: 'DRAW' },
      { playedVersus: 'Man U', result: 'LOSE' },
    ],
  },
];

const PremierLeagueProvider = ({ children }: Props) => {
  const { handleFetch } = useFetch();

  const [data, setData] = useState<PlayingEntity[]>(rawData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const onAddTeam = (name: string) => {
    setData((prevState) => [...prevState, { name, matchesHistory: [] }]);
  };

  const onAddScore = ({
    homeTeamName,
    homeTeamScore,
    awayTeamName,
    awayTeamScore,
  }: IAddScoreForm) => {
    console.log('add score');
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
