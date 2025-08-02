import Input from 'components/Input';
import Button from 'components/Button';
import { usePremierLeagueContext } from 'contexts/PremierLeagueContext/index.tsx';

const AddTeam = () => {
  const { addTeamInput, onAddTeamChange, onAddTeam } =
    usePremierLeagueContext();

  return (
    <div className='mb-4 flex flex-col rounded-md bg-gray-50 p-4'>
      <p className='mb-2 font-bold'>Add Team</p>
      <div className='flex w-full gap-2'>
        <Input
          value={addTeamInput}
          onChange={(e) => onAddTeamChange(e.target.value)}
          placeholder='Team Name'
        />
        <Button onClick={onAddTeam}>Add</Button>
      </div>
    </div>
  );
};

export default AddTeam;
