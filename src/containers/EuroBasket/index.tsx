import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketball, faTrash } from '@fortawesome/free-solid-svg-icons';
import AddHandlers from 'containers/EuroBasket/AddHandlers.tsx';
import { Game } from 'constants.ts';
import Spinner from 'components/Spinner';
import useGame from 'hooks/useGame.ts';
import Matches from 'containers/EuroBasket/Matches.tsx';
import ScoreTable from 'containers/EuroBasket/ScoreTable.tsx';

const EuroBasket = () => {
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
  } = useGame(Game.EuroBasket);

  if (gameError) {
    return <p>{gameError}</p>;
  }

  return (
    <div className='min-h-[300px] w-full max-w-[500px] rounded-lg bg-[#002e26] font-[montserrat] text-sm shadow-lg'>
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
          <Matches matches={gameData.matches} />
          <ScoreTable data={gameData} />
        </div>
      )}
    </div>
  );
};

export default EuroBasket;
