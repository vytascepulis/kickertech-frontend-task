import Table from 'components/Table';
import type { Column, TableOptions } from 'components/Table/types.ts';
import type { PlayingEntity } from 'types.ts';
import { matchesToPoints } from 'utils.ts';
import PremierLeagueTable from 'components/PremierLeagueTable';

const columns: Column<PlayingEntity>[] = [
  { title: 'Team', key: 'name', width: 150, sortable: true },
  { title: 'P', key: 'matchesPlayed', width: 50, sortable: true },
  { title: 'W', key: 'wins', width: 50, sortable: true },
  { title: 'D', key: 'draws', width: 50, sortable: true },
  { title: 'L', key: 'losses', width: 50, sortable: true },
  {
    title: 'Pts',
    key: 'points',
    width: 100,
    render: ({ wins, draws }) => matchesToPoints(wins, draws),
    sortable: true,
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
    <div className='max-w-[500px]'>
      <PremierLeagueTable />
      <Table columns={columns} data={data} options={tableOptions} />
    </div>
  );
}

export default App;
