import { createContext, type ReactNode, useContext, useState } from 'react';
import type { PlayingEntity } from 'types.ts';

interface Props {
  children: ReactNode;
}

interface Context {
  data: PlayingEntity[];
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
  const [data, setData] = useState<PlayingEntity[]>(rawData);

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

  return (
    <PremierLeagueContext.Provider
      value={{
        data,
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
