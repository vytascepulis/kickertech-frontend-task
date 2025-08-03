import { createContext, type ReactNode, useContext, useState } from 'react';
import type { PlayingEntity, TablePlayingEntity } from 'types.ts';
import { formatEntityToTable } from 'utils.ts';

interface Props {
  children: ReactNode;
}

interface Context {
  homeTeamName: string;
  awayTeamName: string;
  homeTeamScore: string;
  awayTeamScore: string;
  data: PlayingEntity[];
  onAddScoreChange: (field: string, val: string) => void;
  onAddTeam: (name: string) => void;
  onAddScore: () => void;
}

interface IAddScoreForm {
  homeTeamName: string;
  homeTeamScore: string;
  awayTeamName: string;
  awayTeamScore: string;
}

const PremierLeagueContext = createContext<Context>({
  homeTeamName: '',
  awayTeamName: '',
  homeTeamScore: '',
  awayTeamScore: '',
  data: [],
  onAddScoreChange: () => {},
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
  const [addScoreForm, setAddScoreForm] = useState<IAddScoreForm>({
    homeTeamName: '',
    homeTeamScore: '',
    awayTeamName: '',
    awayTeamScore: '',
  });
  const [data, setData] = useState<PlayingEntity[]>(rawData);

  const onAddScoreChange = (field: string, val: string) => {
    setAddScoreForm((prevState) => ({ ...prevState, [field]: val }));
  };

  const onAddTeam = (name: string) => {
    setData((prevState) => [...prevState, { name, matchesHistory: [] }]);
  };

  const onAddScore = () => {
    console.log('add score: ', addScoreForm);
  };

  return (
    <PremierLeagueContext.Provider
      value={{
        ...addScoreForm,
        data,
        onAddScoreChange,
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
