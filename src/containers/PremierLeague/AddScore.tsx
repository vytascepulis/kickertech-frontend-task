import Select from 'components/Select';
import Input from 'components/Input';
import Button from 'components/Button';
import {
  type RegisterOptions,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';
import { checkHasPlayedVersus, sanitizeNumberInput } from 'utils.ts';
import ErrorMessage from 'components/ErrorMessage';
import type { GameData, IAddScoreForm } from 'types.ts';

interface Props {
  data: GameData;
  onAddScore: (data: IAddScoreForm) => void;
  isLoading: boolean;
  error: string | null;
}

const AddScore = ({ data, onAddScore, isLoading, error }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IAddScoreForm>();

  const handleAddScore: SubmitHandler<IAddScoreForm> = (data) => {
    onAddScore(data);
    reset();
  };

  const [selectedHomeTeam, selectedAwayTeam] = watch([
    'participantAId',
    'participantBId',
  ]);

  const getFilteredTeams = (filteredId: string) => {
    return [...data.participants]
      .filter((team) => team.id !== filteredId)
      .map((team) => ({ label: team.name, value: team.id }));
  };

  const validateHasPlayedAgainst: RegisterOptions<
    IAddScoreForm,
    'participantAId'
  > = {
    validate: (value, { participantBId }) => {
      const homeTeamEntity = data.participants.find((p) => p.id === value)!;

      return (
        !checkHasPlayedVersus(
          data.matches,
          homeTeamEntity.id,
          participantBId
        ) || 'Selected teams have already played each other'
      );
    },
  };

  const errorMessages = Object.values(errors).map((error) => error.message);

  return (
    <form
      onSubmit={handleSubmit(handleAddScore)}
      className='flex flex-col rounded-md bg-gray-50 p-4'
    >
      <p className='mb-2 font-bold'>Add Score</p>
      <div className='grid grid-cols-2 grid-rows-3 gap-2'>
        <Select
          {...register('participantAId', {
            required: 'Select home team',
            ...validateHasPlayedAgainst,
          })}
          placeholder='Home Team'
          setValue={(_, val) => setValue('participantAId', val)}
          value={selectedHomeTeam}
          options={getFilteredTeams(selectedAwayTeam)}
        />
        <Select
          {...register('participantBId', {
            required: 'Select away team',
            ...validateHasPlayedAgainst,
          })}
          placeholder='Away Team'
          setValue={(_, val) => setValue('participantBId', val)}
          value={selectedAwayTeam}
          options={getFilteredTeams(selectedHomeTeam)}
        />
        <Input
          {...register('participantAScore', { required: 'Enter home score' })}
          type='number'
          inputMode='numeric'
          placeholder='Home Score'
          onKeyDown={sanitizeNumberInput}
          min={0}
        />
        <Input
          {...register('participantBScore', { required: 'Enter away score' })}
          type='number'
          inputMode='numeric'
          placeholder='Away Score'
          onKeyDown={sanitizeNumberInput}
          min={0}
        />
        <Button loading={isLoading} type='submit' className='col-span-2'>
          Add Score
        </Button>
      </div>
      {errorMessages.map((message, idx) => (
        <ErrorMessage key={idx} message={message} />
      ))}
      {error && <ErrorMessage message={error} />}
    </form>
  );
};

export default AddScore;
