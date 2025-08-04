import Button from 'components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import type { GameData, IAddScoreForm, PlayingEntity } from 'types.ts';
import { useState } from 'react';
import AddParticipant from 'containers/EuroBasket/AddParticipant.tsx';
import AddScore from 'containers/EuroBasket/AddScore.tsx';

interface Props {
  data: GameData;
  onAddParticipant: (name: PlayingEntity['name']) => void;
  participantError: string | null;
  participantLoading: boolean;
  onAddScore: (data: IAddScoreForm) => void;
  scoreError: string | null;
  scoreLoading: boolean;
}

type Handlers = 'participant' | 'score';

const AddHandlers = ({
  data,
  onAddParticipant,
  participantError,
  participantLoading,
  onAddScore,
  scoreError,
  scoreLoading,
}: Props) => {
  const [openedHandler, setOpenedHandler] = useState<Handlers | null>(null);

  const onOpenHandler = (handler: Handlers) => {
    if (openedHandler === handler) {
      setOpenedHandler(null);
      return;
    }

    setOpenedHandler(handler);
  };

  const participantOpen = openedHandler === 'participant';
  const scoreOpen = openedHandler === 'score';

  return (
    <div className='mb-3'>
      <div className='flex justify-between gap-3 text-sm'>
        <Button onClick={() => onOpenHandler('participant')} color='orange'>
          <FontAwesomeIcon icon={faPlus} /> Add Team
        </Button>
        <Button onClick={() => onOpenHandler('score')} color='orange'>
          <FontAwesomeIcon icon={faPlus} /> Add Score
        </Button>
      </div>
      {openedHandler && (
        <div className='mt-5 text-sm'>
          {participantOpen && (
            <AddParticipant
              onAddParticipant={onAddParticipant}
              participants={data.participants}
              error={participantError}
              loading={participantLoading}
            />
          )}
          {scoreOpen && (
            <AddScore
              data={data}
              onAddScore={onAddScore}
              error={scoreError}
              loading={scoreLoading}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AddHandlers;
