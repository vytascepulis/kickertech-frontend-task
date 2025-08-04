import { useEffect, useState } from 'react';
import useFetch from 'hooks/useFetch.ts';
import type {
  GameData,
  GameType,
  IAddScoreForm,
  PlayingEntity,
} from 'types.ts';

const useGame = (game: GameType) => {
  const [fakeLoading, setFakeLoading] = useState<boolean>(true);

  const {
    data: gameData,
    error: gameError,
    handleFetch: getGamesData,
    updateData: updateGameData,
  } = useFetch<GameData>();

  const {
    isLoading: participantLoading,
    error: participantError,
    handleFetch: addParticipant,
  } = useFetch<GameData>();

  const {
    isLoading: scoreLoading,
    error: scoreError,
    handleFetch: addScore,
  } = useFetch<GameData>();

  const { handleFetch: clearData } = useFetch<GameData>();

  const onAddParticipant = (name: PlayingEntity['name']) => {
    addParticipant<{ name: PlayingEntity['name'] }>({
      endpoint: `${game}/participant`,
      method: 'POST',
      data: { name },
      onSuccess: (data) => updateGameData(data),
    });
  };

  const onAddScore = (data: IAddScoreForm) => {
    addScore<IAddScoreForm>({
      endpoint: `${game}/score`,
      method: 'POST',
      data,
      onSuccess: (data) => updateGameData(data),
    });
  };

  const onClearData = () => {
    clearData({
      endpoint: `${game}`,
      method: 'DELETE',
      onSuccess: (data) => updateGameData(data),
    });
  };

  useEffect(() => {
    getGamesData({
      endpoint: `${game}/data`,
      onFinish: () => setFakeLoading(false),
    });
  }, []);

  return {
    fakeLoading,
    gameData,
    gameError,
    participantLoading,
    participantError,
    scoreLoading,
    scoreError,
    onAddParticipant,
    onAddScore,
    onClearData,
  };
};

export default useGame;
