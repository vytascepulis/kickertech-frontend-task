import type { Game } from 'contexts/GameDataContext/constants.ts';
import type { PlayingEntity } from 'types.ts';

export type GameType = (typeof Game)[keyof typeof Game];

export interface Context {
  data: { [key in GameType]: PlayingEntity[] };
  isLoading: boolean;
  error: { [key in GameType]: string | undefined };
  onAddEntity: (game: GameType, name: string) => void;
  onAddScore: (game: GameType, scoreData: IAddScoreForm) => void;
  onClearData: (game: GameType) => void;
}

export interface IAddScoreForm {
  homeEntityId: string;
  homeEntityScore: string;
  awayEntityId: string;
  awayEntityScore: string;
}
