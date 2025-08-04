import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaseball, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Game } from 'constants.ts';
import Spinner from 'components/Spinner';
import useGame from 'hooks/useGame.ts';
import AddHandlers from 'containers/Wimbledon/AddHandlers.tsx';
import ScoreTable from 'containers/Wimbledon/ScoreTable.tsx';

const Wimbledon = () => {
  const {
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
  } = useGame(Game.Wimbledon);

  if (gameError) {
    return <p>{gameError}</p>;
  }

  return (
    <div className='w-full max-w-[500px] rounded-lg font-mono shadow-lg'>
      <div className='flex justify-between rounded-t-lg bg-green-800 p-4 text-2xl font-semibold text-white'>
        <div>
          <FontAwesomeIcon icon={faBaseball} className='mr-2' /> Wimbledon
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
        <div className='p-[30px]'>
          <AddHandlers
            data={gameData}
            onAddParticipant={onAddParticipant}
            participantError={participantError}
            participantLoading={participantLoading}
            onAddScore={onAddScore}
            scoreError={scoreError}
            scoreLoading={scoreLoading}
          />
          <ScoreTable data={gameData} />
        </div>
      )}
    </div>
  );
};

export default Wimbledon;
