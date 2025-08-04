import type { Game } from 'constants.ts';

export interface Match {
  participantA: PlayingEntity & { score: number };
  participantB: PlayingEntity & { score: number };
  winner: string | null;
}

export interface PlayingEntity {
  id: string;
  name: string;
}

export interface GameData {
  participants: PlayingEntity[];
  matches: Match[];
}

export interface TablePlayingEntity {
  name: PlayingEntity['name'];
  matchesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  points: number;
}

export interface IAddScoreForm {
  participantAId: string;
  participantAScore: string;
  participantBId: string;
  participantBScore: string;
}

export type GameType = (typeof Game)[keyof typeof Game];
