import AddParticipant from 'containers/PremierLeague/AddParticipant.tsx';
import { useEffect, useState } from 'react';
import Spinner from 'components/Spinner';
import { Game } from 'constants.ts';
import type { GameData, IAddScoreForm, PlayingEntity } from 'types.ts';
import useFetch from 'hooks/useFetch.ts';
import AddScore from 'containers/PremierLeague/AddScore.tsx';
import ScoreTable from 'containers/PremierLeague/ScoreTable.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const PremierLeague = () => {
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
      endpoint: `${Game.PremierLeague}/participant`,
      method: 'POST',
      data: { name },
      onSuccess: (data) => updateGameData(data),
    });
  };

  const onAddScore = (data: IAddScoreForm) => {
    addScore<IAddScoreForm>({
      endpoint: `${Game.PremierLeague}/score`,
      method: 'POST',
      data,
      onSuccess: (data) => updateGameData(data),
    });
  };

  const onClearData = () => {
    clearData({
      endpoint: `${Game.PremierLeague}`,
      method: 'DELETE',
      onSuccess: (data) => updateGameData(data),
    });
  };

  useEffect(() => {
    getGamesData({
      endpoint: `${Game.PremierLeague}/data`,
      onFinish: () => setFakeLoading(false),
    });
  }, []);

  if (gameError) {
    return <p>{gameError}</p>;
  }

  return (
    <div className='max-w-[400px] overflow-hidden rounded-xl border border-neutral-200 font-[inter] shadow-lg'>
      <div className='flex justify-between bg-[#37003c] p-4 text-2xl font-semibold text-white'>
        Premier League
        <button
          onClick={onClearData}
          className='cursor-pointer text-red-400 transition-colors hover:text-red-500'
        >
          <FontAwesomeIcon size='xs' icon={faTrash} />
        </button>
      </div>
      {fakeLoading && <Spinner />}
      {!fakeLoading && gameData && (
        <div className='p-4'>
          <AddParticipant
            participants={gameData.participants}
            onAddParticipant={onAddParticipant}
            isLoading={participantLoading}
            error={participantError}
          />
          <AddScore
            data={gameData}
            onAddScore={onAddScore}
            isLoading={scoreLoading}
            error={scoreError}
          />
          <ScoreTable data={gameData} />
        </div>
      )}
    </div>
  );
};

export default PremierLeague;
