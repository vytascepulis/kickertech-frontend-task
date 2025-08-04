import Input from 'components/Input';
import Button from 'components/Button';
import {
  type RegisterOptions,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';
import ErrorMessage from 'components/ErrorMessage';
import type { PlayingEntity } from 'types.ts';

type FormInputs = {
  newTeamInput: string;
};

interface Props {
  participants: PlayingEntity[];
  onAddParticipant: (name: PlayingEntity['name']) => void;
  isLoading: boolean;
  error: string | null;
}

const AddParticipant = ({
  participants,
  onAddParticipant,
  isLoading,
  error,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const handleAddTeam: SubmitHandler<FormInputs> = ({
    newTeamInput: value,
  }) => {
    onAddParticipant(value);
    reset();
  };

  const inputValidation: RegisterOptions<FormInputs, 'newTeamInput'> = {
    required: 'Team name cannot be empty',
    validate: (value) => {
      if (
        participants.find((p) => p.name.toLowerCase() === value.toLowerCase())
      ) {
        return 'Team name already exists';
      }

      return true;
    },
  };

  return (
    <div className='mb-4 flex flex-col rounded-md bg-gray-50 p-4'>
      <form onSubmit={handleSubmit(handleAddTeam)}>
        <p className='mb-2 font-bold'>Add Team</p>
        <div className='flex w-full gap-2'>
          <Input
            placeholder='Team Name'
            {...register('newTeamInput', inputValidation)}
          />
          <Button type='submit' loading={isLoading}>
            Add
          </Button>
        </div>
      </form>
      {(errors.newTeamInput || error) && (
        <ErrorMessage message={errors.newTeamInput?.message || error} />
      )}
    </div>
  );
};

export default AddParticipant;
