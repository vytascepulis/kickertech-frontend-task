import AddParticipant from 'containers/PremierLeague/AddParticipant.tsx';
import Spinner from 'components/Spinner';
import { Game } from 'constants.ts';
import AddScore from 'containers/PremierLeague/AddScore.tsx';
import ScoreTable from 'containers/PremierLeague/ScoreTable.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import useGame from 'hooks/useGame.ts';

const PremierLeague = () => {
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
  } = useGame(Game.PremierLeague);

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
