interface MatchHistory {
  result: 'WIN' | 'LOSE' | 'DRAW';
  playedVersus: PlayingEntity['id'];
}

export interface PlayingEntity {
  id: string;
  name: string;
  matchesHistory: MatchHistory[];
}

export type PlayingEntityWithoutId = Omit<PlayingEntity, 'id'>;

export interface TablePlayingEntity {
  name: PlayingEntity['name'];
  matchesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  points?: number;
}
