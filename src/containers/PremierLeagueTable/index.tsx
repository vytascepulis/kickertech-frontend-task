import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import Input from 'components/Input';
import Button from 'components/Button';
import Select from 'components/Select';
import Table from 'components/Table';
import type { Column, TableOptions } from 'components/Table/types.ts';
import type { TablePlayingEntity } from 'types.ts';
import { matchesToPoints } from 'utils.ts';

const columns: Column<TablePlayingEntity>[] = [
  { title: 'Team', key: 'name', width: 100, sortable: true },
  { title: 'P', key: 'matchesPlayed', width: 20, sortable: true },
  { title: 'W', key: 'wins', width: 20, sortable: true },
  { title: 'D', key: 'draws', width: 20, sortable: true },
  { title: 'L', key: 'losses', width: 20, sortable: true },
  {
    title: 'Pts',
    key: 'points',
    width: 50,
    render: ({ wins, draws }) => matchesToPoints(wins, draws),
    sortable: true,
  },
];

const data: TablePlayingEntity[] = [
  { name: 'Man U', matchesPlayed: 3, wins: 2, draws: 1, losses: 0 },
  { name: 'Liverpool', matchesPlayed: 3, wins: 2, draws: 0, losses: 1 },
  { name: 'Arsenal', matchesPlayed: 3, wins: 1, draws: 2, losses: 0 },
  { name: 'Chelsea', matchesPlayed: 3, wins: 1, draws: 1, losses: 1 },
];

const tableOptions: TableOptions<TablePlayingEntity> = {
  defaultSort: { field: 'points', order: 'asc' },
};

const PremierLeagueTable = () => {
  return (
    <div className='max-w-[400px] overflow-hidden rounded-xl border border-neutral-200 shadow-lg'>
      <div className='bg-[#37003c] p-4 text-2xl font-semibold text-white'>
        Premier League
      </div>
      <div className='p-4'>
        <div className='mb-4 flex flex-col rounded-md bg-gray-50 p-4'>
          <p className='mb-2 font-bold'>Add Team</p>
          <div className='flex w-full gap-2'>
            <Input placeholder='Team Name' />
            <Button>Add</Button>
          </div>
        </div>
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
        <Table columns={columns} data={data} options={tableOptions} />
      </div>
    </div>
  );
};

export default PremierLeagueTable;
