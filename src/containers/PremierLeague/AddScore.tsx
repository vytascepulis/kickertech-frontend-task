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

  const formatOptionValue = (label: string) => {
    return label.toLowerCase().replaceAll(' ', '-');
  };

  const allTeams = data.map((team) => team.name);

  const [selectedHomeTeam, selectedAwayTeam] = watch([
    'homeTeamName',
    'awayTeamName',
  ]);

  const getFilteredTeams = (filteredName: string) => {
    return [...allTeams]
      .filter((team) => team !== filteredName)
      .map((team) => (
        <option key={formatOptionValue(team)} value={team}>
          {team}
        </option>
      ));
  };

  const validateHasPlayedAgainst: RegisterOptions<
    IAddScoreForm,
    'homeTeamName'
  > = {
    validate: (value, { awayTeamName }) => {
      const homeTeamEntity = data.find((t) => t.name === value)!;

      return (
        !checkHasPlayedVersus(homeTeamEntity, awayTeamName) ||
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
          {...register('homeTeamName', {
            required: 'Select home team',
            ...validateHasPlayedAgainst,
          })}
          placeholder='Home Team'
        >
          {getFilteredTeams(selectedAwayTeam)}
        </Select>
        <Select
          value={selectedAwayTeam ? undefined : ''}
          {...register('awayTeamName', { required: 'Select away team' })}
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
        <div key={idx} className='mt-2 text-sm font-bold text-red-500'>
          {message}
        </div>
      ))}
    </form>
  );
};

export default AddScore;
