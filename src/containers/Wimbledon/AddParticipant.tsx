import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';
import type { PlayingEntity } from 'types.ts';
import {
  type RegisterOptions,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';
import Input from 'components/Input';

interface Props {
  onAddParticipant: (name: PlayingEntity['name']) => void;
  participants: PlayingEntity[];
  error: string | null;
  loading: boolean;
}

interface ParticipantForm {
  participantName: string;
}

const AddParticipant = ({
  onAddParticipant,
  participants,
  loading,
  error,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ParticipantForm>();

  const handleAddParticipant: SubmitHandler<ParticipantForm> = ({
    participantName: value,
  }) => {
    onAddParticipant(value);
    reset();
  };

  const inputValidation: RegisterOptions<ParticipantForm, 'participantName'> = {
    required: 'Player name cannot be empty',
    validate: (value) => {
      if (
        participants.find((p) => p.name.toLowerCase() === value.toLowerCase())
      ) {
        return 'Player Name already exists';
      }

      return true;
    },
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleAddParticipant)}
        className='flex gap-2'
      >
        <Input
          placeholder='Player Name'
          {...register('participantName', inputValidation)}
        />
        <Button color='green' type='submit' loading={loading}>
          Add
        </Button>
      </form>
      {(errors.participantName || error) && (
        <ErrorMessage message={errors.participantName?.message || error} />
      )}
    </>
  );
};

export default AddParticipant;
