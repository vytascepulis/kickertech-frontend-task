import Select from 'components/Select';
import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';
import type { PlayingEntity } from 'types.ts';
import {
  type RegisterOptions,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';
import countries from 'countries.json';

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
    watch,
    setValue,
    formState: { errors },
  } = useForm<ParticipantForm>();

  const addedCountries = participants.map((p) => p.name);
  const availableCountries = countries.filter(
    (c) => !addedCountries.includes(c.code)
  );

  const countryOptions = availableCountries.map((c) => ({
    value: c.code,
    label: `${c.emoji} ${c.name}`,
  }));

  const handleAddParticipant: SubmitHandler<ParticipantForm> = ({
    participantName: value,
  }) => {
    onAddParticipant(value);
    reset();
  };

  const [participantName] = watch(['participantName']);

  const inputValidation: RegisterOptions<ParticipantForm, 'participantName'> = {
    required: 'Team Country cannot be empty',
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
    <>
      <form
        onSubmit={handleSubmit(handleAddParticipant)}
        className='flex gap-2'
      >
        <Select
          {...register('participantName', inputValidation)}
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
