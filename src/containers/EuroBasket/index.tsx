import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketball, faTrash } from '@fortawesome/free-solid-svg-icons';
import AddHandlers from 'containers/EuroBasket/AddHandlers.tsx';
import type { GameData, IAddScoreForm, PlayingEntity } from 'types.ts';
import { useEffect, useState } from 'react';
import useFetch from 'hooks/useFetch.ts';
import { Game } from 'constants.ts';
import Spinner from 'components/Spinner';

const EuroBasket = () => {
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
      endpoint: `${Game.EuroBasket}/participant`,
      method: 'POST',
      data: { name },
      onSuccess: (data) => updateGameData(data),
    });
  };

  const onAddScore = (data: IAddScoreForm) => {
    addScore<IAddScoreForm>({
      endpoint: `${Game.EuroBasket}/score`,
      method: 'POST',
      data,
      onSuccess: (data) => updateGameData(data),
    });
  };

  const onClearData = () => {
    clearData({
      endpoint: `${Game.EuroBasket}`,
      method: 'DELETE',
      onSuccess: (data) => updateGameData(data),
    });
  };

  useEffect(() => {
    getGamesData({
      endpoint: `${Game.EuroBasket}/data`,
      onFinish: () => setFakeLoading(false),
    });
  }, []);

  if (gameError) {
    return <p>{gameError}</p>;
  }

  return (
    <div className='max-w-[400px] rounded-lg bg-[#002e26] font-[montserrat] shadow-lg'>
      <div className='flex justify-between p-4 text-2xl font-semibold text-white uppercase'>
        <div>
          <FontAwesomeIcon icon={faBasketball} className='mr-2' /> Eurobasket
        </div>
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
          <AddHandlers
            data={gameData}
            onAddParticipant={onAddParticipant}
            participantError={participantError}
            participantLoading={participantLoading}
            onAddScore={onAddScore}
            scoreError={scoreError}
            scoreLoading={scoreLoading}
          />
        </div>
      )}
    </div>
  );
};

export default EuroBasket;
