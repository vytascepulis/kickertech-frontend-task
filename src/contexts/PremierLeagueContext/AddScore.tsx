import Select from 'components/Select';
import Input from 'components/Input';
import Button from 'components/Button';
import { usePremierLeagueContext } from 'contexts/PremierLeagueContext/index.tsx';

const AddScore = () => {
  const {
    homeTeamName,
    homeTeamScore,
    awayTeamName,
    awayTeamScore,
    onAddScoreChange,
  } = usePremierLeagueContext();

  return (
    <div className='flex flex-col rounded-md bg-gray-50 p-4'>
      <p className='mb-2 font-bold'>Add Score</p>
      <div className='grid grid-cols-2 grid-rows-3 gap-2'>
        <Select
          placeholder='Home Team'
          options={[{ value: 'test', label: 'test' }]}
        />
        <Select
          placeholder='Away Team'
          options={[{ value: 'test', label: 'test' }]}
        />
        <Input placeholder='Home Score' />
        <Input placeholder='Away Score' />
        <Button className='col-span-2'>Add Score</Button>
      </div>
    </div>
  );
};

export default AddScore;
