import type { Match, PlayingEntity, TablePlayingEntity } from 'types.ts';

export const matchesToPoints = (wins: number, draws: number) => {
  return wins * 3 + draws;
};

export const formatEntityToTable = (
  participant: PlayingEntity,
  matches: Match[]
): TablePlayingEntity => {
  const playedMatches = matches.filter(
    (m) =>
      m.participantA.id === participant.id ||
      m.participantB.id === participant.id
  );

  const matchesData = playedMatches.reduce(
    (acc, curr) => {
      switch (curr.winner) {
        case participant.id:
          return { ...acc, wins: acc.wins + 1 };
        case null:
          return { ...acc, draws: acc.draws + 1 };
        default:
          return { ...acc, losses: acc.losses + 1 };
      }
    },
    {
      wins: 0,
      losses: 0,
      draws: 0,
    }
  );

  return {
    name: participant.name,
    matchesPlayed: playedMatches.length,
    points: matchesToPoints(matchesData.wins, matchesData.draws),
    ...matchesData,
  };
};

export const checkHasPlayedVersus = (
  matches: Match[],
  participantAId: string,
  participantBId: string
) => {
  return Boolean(
    matches
      .filter((m) => m.participantA.id === participantAId)
      .find((m) => m.participantB.id === participantBId)
  );
};

export const sanitizeNumberInput = (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  const allowedKeys = /^[0-9]$/;
  const controlKeys = [
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'Tab',
    'Enter',
  ];

  if (controlKeys.includes(event.key)) {
    return;
  }

  if (!allowedKeys.test(event.key)) {
    event.preventDefault();
    return;
  }

  if (event.currentTarget.value === '0') {
    event.preventDefault();
  }
};
