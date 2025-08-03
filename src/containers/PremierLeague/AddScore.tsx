import Select from 'components/Select';
import Input from 'components/Input';
import Button from 'components/Button';
import { usePremierLeagueContext } from 'contexts/GameDataContext';
import {
  type RegisterOptions,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';
import { checkHasPlayedVersus, sanitizeNumberInput } from 'utils.ts';
import ErrorMessage from 'components/ErrorMessage';
import type { IAddScoreForm } from 'contexts/GameDataContext/types.ts';

const AddScore = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IAddScoreForm>();
  const { onAddScore, data } = usePremierLeagueContext();

  const handleAddScore: SubmitHandler<IAddScoreForm> = (data) => {
    onAddScore('PremierLeague', data);
    reset();
  };

  const [selectedHomeTeam, selectedAwayTeam] = watch([
    'homeEntityId',
    'awayEntityId',
  ]);

  console.log(data['PremierLeague']);
  const getFilteredTeams = (filteredId: string) => {
    return [...data['PremierLeague']]
      .filter((team) => team.id !== filteredId)
      .map((team) => ({ label: team.name, value: team.id }));
  };

  const validateHasPlayedAgainst: RegisterOptions<
    IAddScoreForm,
    'homeEntityId'
  > = {
    validate: (value, { awayEntityId }) => {
      const homeTeamEntity = data['PremierLeague'].find((t) => t.id === value)!;

      return (
        !checkHasPlayedVersus(homeTeamEntity, awayEntityId) ||
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
          {...register('homeEntityId', {
            required: 'Select home team',
            ...validateHasPlayedAgainst,
          })}
          placeholder='Home Team'
          setValue={(_, val) => setValue('homeEntityId', val)}
          value={selectedHomeTeam}
          options={getFilteredTeams(selectedAwayTeam)}
        />
        <Select
          {...register('awayEntityId', {
            required: 'Select away team',
            ...validateHasPlayedAgainst,
          })}
          placeholder='Away Team'
          setValue={(_, val) => setValue('awayEntityId', val)}
          value={selectedAwayTeam}
          options={getFilteredTeams(selectedHomeTeam)}
        />
        <Input
          {...register('homeEntityScore', { required: 'Enter home score' })}
          type='number'
          inputMode='numeric'
          placeholder='Home Score'
          onKeyDown={sanitizeNumberInput}
          min={0}
        />
        <Input
          {...register('awayEntityScore', { required: 'Enter away score' })}
          type='number'
          inputMode='numeric'
          placeholder='Away Score'
          onKeyDown={sanitizeNumberInput}
          min={0}
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
