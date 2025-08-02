import type { PlayingEntity, TablePlayingEntity } from 'types.ts';

export const matchesToPoints = (wins: number, draws: number) => {
  return wins * 3 + draws;
};

const getEntityResults = (playingEntity: PlayingEntity) => {
  return playingEntity.matchesHistory.reduce(
    (acc, curr) => {
      switch (curr.result) {
        case 'WIN':
          return { ...acc, wins: acc.wins + 1 };
        case 'LOSE':
          return { ...acc, losses: acc.losses + 1 };
        default:
          return { ...acc, draws: acc.draws + 1 };
      }
    },
    { wins: 0, losses: 0, draws: 0 }
  );
};

export const formatEntityToTable = (
  playingEntity: PlayingEntity
): TablePlayingEntity => {
  const entityResults = getEntityResults(playingEntity);
  return {
    name: playingEntity.name,
    matchesPlayed: playingEntity.matchesHistory.length,
    points: matchesToPoints(entityResults.wins, entityResults.draws),
    ...entityResults,
  };
};

export const checkHasPlayedVersus = (
  playingEntity: PlayingEntity,
  versusEntityName: string
) => {
  return Boolean(
    playingEntity.matchesHistory.find(
      (m) => m.playedVersus === versusEntityName
    )
  );
};
