import Input from 'components/Input';
import Button from 'components/Button';
import { usePremierLeagueContext } from 'contexts/PremierLeagueContext/index.tsx';

const AddTeam = () => {
  const { addTeamInput, onAddTeamChange, onAddTeam, errors } =
    usePremierLeagueContext();

  const handleAddTeam = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onAddTeam();
  };

  return (
    <form
      onSubmit={handleAddTeam}
      className='mb-4 flex flex-col rounded-md bg-gray-50 p-4'
    >
      <p className='mb-2 font-bold'>Add Team</p>
      <div className='flex w-full gap-2'>
        <Input
          value={addTeamInput}
          onChange={(e) => onAddTeamChange(e.target.value)}
          placeholder='Team Name'
          required
        />
        <Button type='submit'>Add</Button>
      </div>
      {errors.addTeam && (
        <div className='mt-2 text-sm font-bold text-red-500'>
          {errors.addTeam}
        </div>
      )}
    </form>
  );
};

export default AddTeam;
