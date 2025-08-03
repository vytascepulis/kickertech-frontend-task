import Input from 'components/Input';
import Button from 'components/Button';
import { usePremierLeagueContext } from 'contexts/PremierLeagueContext/index.tsx';
import {
  type RegisterOptions,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';

type FormInputs = {
  newTeamInput: string;
};

const AddTeam = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();
  const { onAddTeam, data } = usePremierLeagueContext();

  const handleAddTeam: SubmitHandler<FormInputs> = ({
    newTeamInput: value,
  }) => {
    onAddTeam(value);
    reset();
  };

  const inputValidation: RegisterOptions<FormInputs, 'newTeamInput'> = {
    required: 'Team name cannot be empty',
    validate: (value) => {
      if (
        data.find((team) => team.name.toLowerCase() === value.toLowerCase())
      ) {
        return 'Team name already exists';
      }

      return true;
    },
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddTeam)}
      className='mb-4 flex flex-col rounded-md bg-gray-50 p-4'
    >
      <p className='mb-2 font-bold'>Add Team</p>
      <div className='flex w-full gap-2'>
        <Input
          placeholder='Team Name'
          {...register('newTeamInput', inputValidation)}
        />
        <Button type='submit'>Add</Button>
      </div>
      {errors.newTeamInput && (
        <div className='mt-2 text-sm font-bold text-red-500'>
          {errors.newTeamInput.message}
        </div>
      )}
    </form>
  );
};

export default AddTeam;
