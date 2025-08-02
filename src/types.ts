interface MatchHistory {
  result: 'WIN' | 'LOSE' | 'DRAW';
  playedVersus: PlayingEntity['name'];
}

export interface PlayingEntity {
  name: string;
  matchesHistory: MatchHistory[];
}

export interface TablePlayingEntity {
  name: PlayingEntity['name'];
  matchesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  points?: number;
}
