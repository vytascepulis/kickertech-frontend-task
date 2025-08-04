import Select from 'components/Select';
import Input from 'components/Input';
import {
  checkHasPlayedVersus,
  getCountryByCode,
  sanitizeNumberInput,
} from 'utils.ts';
import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';
import {
  type RegisterOptions,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';
import type { GameData, IAddScoreForm } from 'types.ts';

interface Props {
  data: GameData;
  onAddScore: (data: IAddScoreForm) => void;
  error: string | null;
  loading: boolean;
}

const AddScore = ({ data, onAddScore, error, loading }: Props) => {
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
      .map((team) => {
        const country = getCountryByCode(team.name);
        return { label: `${country?.emoji} ${country?.name}`, value: team.id };
      });
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
    <>
      <form
        onSubmit={handleSubmit(handleAddScore)}
        className='grid grid-cols-2 grid-rows-3 gap-3'
      >
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
        <Input
          {...register('participantAScore', {
            required: 'Enter home score',
          })}
          type='number'
          inputMode='numeric'
          placeholder='Home Score'
          onKeyDown={sanitizeNumberInput}
          min={0}
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
          {...register('participantBScore', {
            required: 'Enter away score',
          })}
          type='number'
          inputMode='numeric'
          placeholder='Away Score'
          onKeyDown={sanitizeNumberInput}
          min={0}
        />
        <Button
          color='orange'
          loading={loading}
          type='submit'
          className='col-span-2'
        >
          Add Score
        </Button>
      </form>
      {errorMessages.map((message, idx) => (
        <ErrorMessage key={idx} message={message} />
      ))}
      {error && <ErrorMessage message={error} />}
    </>
  );
};
export default AddScore;
