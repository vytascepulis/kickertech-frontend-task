import Select from 'components/Select';
import Input from 'components/Input';
import Button from 'components/Button';
import {
  type IAddScoreForm,
  usePremierLeagueContext,
} from 'contexts/PremierLeagueContext';
import {
  type RegisterOptions,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';
import { checkHasPlayedVersus, sanitizeNumberInput } from 'utils.ts';
import ErrorMessage from 'components/ErrorMessage';

const AddScore = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IAddScoreForm>();
  const { onAddScore, data } = usePremierLeagueContext();

  const handleAddScore: SubmitHandler<IAddScoreForm> = (data) => {
    onAddScore(data);
    reset();
  };

  const [selectedHomeTeam, selectedAwayTeam] = watch([
    'homeTeamId',
    'awayTeamId',
  ]);

  const getFilteredTeams = (filteredId: string) => {
    return [...data]
      .filter((team) => team.id !== filteredId)
      .map((team) => (
        <option key={team.id} value={team.id}>
          {team.name}
        </option>
      ));
  };

  const validateHasPlayedAgainst: RegisterOptions<IAddScoreForm, 'homeTeamId'> =
    {
      validate: (value, { awayTeamId }) => {
        const homeTeamEntity = data.find((t) => t.id === value)!;

        return (
          !checkHasPlayedVersus(homeTeamEntity, awayTeamId) ||
          'Selected teams have already played each other'
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
          value={selectedHomeTeam ? undefined : ''}
          {...register('homeTeamId', {
            required: 'Select home team',
            ...validateHasPlayedAgainst,
          })}
          placeholder='Home Team'
        >
          {getFilteredTeams(selectedAwayTeam)}
        </Select>
        <Select
          value={selectedAwayTeam ? undefined : ''}
          {...register('awayTeamId', { required: 'Select away team' })}
          placeholder='Away Team'
        >
          {getFilteredTeams(selectedHomeTeam)}
        </Select>
        <Input
          {...register('homeTeamScore', { required: 'Enter home score' })}
          type='number'
          inputMode='numeric'
          placeholder='Home Score'
          onKeyDown={sanitizeNumberInput}
        />
        <Input
          {...register('awayTeamScore', { required: 'Enter away score' })}
          type='number'
          inputMode='numeric'
          placeholder='Away Score'
          onKeyDown={sanitizeNumberInput}
        />
        <Button type='submit' className='col-span-2'>
          Add Score
        </Button>
      </div>
      {errorMessages.map((message, idx) => (
        <ErrorMessage key={idx} message={message} />
      ))}
    </form>
  );
};

export default AddScore;
