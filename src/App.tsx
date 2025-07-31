import Table from 'components/Table';
import type { Column, TableOptions } from 'components/Table/types.ts';
import type { PlayingEntity } from 'types.ts';
import { matchesToPoints } from 'utils.ts';

const columns: Column<PlayingEntity>[] = [
  { title: 'Team', key: 'name' },
  { title: 'P', key: 'matchesPlayed', maxWidth: 50 },
  { title: 'W', key: 'wins', maxWidth: 50 },
  { title: 'D', key: 'draws', maxWidth: 50 },
  { title: 'L', key: 'losses', maxWidth: 50 },
  {
    title: 'Pts',
    key: 'points',
    maxWidth: 100,
    render: ({ wins, draws }) => matchesToPoints(wins, draws),
  },
];

const data: PlayingEntity[] = [
  { name: 'Man U', matchesPlayed: 3, wins: 2, draws: 1, losses: 0 },
  { name: 'Liverpool', matchesPlayed: 3, wins: 2, draws: 0, losses: 1 },
  { name: 'Arsenal', matchesPlayed: 3, wins: 1, draws: 2, losses: 0 },
  { name: 'Chelsea', matchesPlayed: 3, wins: 1, draws: 1, losses: 1 },
];

const tableOptions: TableOptions<PlayingEntity> = {
  defaultSort: { field: 'points', order: 'asc' },
};

function App() {
  return (
    <div className='max-w-[400px]'>
      <Table columns={columns} data={data} options={tableOptions} />
    </div>
  );
}

export default App;
