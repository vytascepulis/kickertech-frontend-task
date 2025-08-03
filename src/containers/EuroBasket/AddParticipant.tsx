import Select from 'components/Select';
import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';
import type { PlayingEntity } from 'types.ts';
import { type SubmitHandler, useForm } from 'react-hook-form';
import countries from 'countries.json';

const countryOptions = countries.map((c) => ({
  value: c.code,
  label: `${c.emoji} ${c.name}`,
}));

interface Props {
  onAddParticipant: (name: PlayingEntity['name']) => void;
  error: string | null;
  loading: boolean;
}

interface ParticipantForm {
  participantName: string;
}

const AddParticipant = ({ onAddParticipant, loading, error }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ParticipantForm>();

  const handleAddParticipant: SubmitHandler<ParticipantForm> = ({
    participantName: value,
  }) => {
    onAddParticipant(value);
    reset();
  };

  const [participantName] = watch(['participantName']);

  return (
    <>
      <form
        onSubmit={handleSubmit(handleAddParticipant)}
        className='flex gap-2'
      >
        <Select
          {...register('participantName', {
            required: 'Team Country cannot be empty',
          })}
          placeholder='Team Country'
          setValue={(_, val) => setValue('participantName', val)}
          value={participantName}
          options={countryOptions}
        />
        <Button color='orange' type='submit' loading={loading}>
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
