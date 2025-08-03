import Table from 'components/Table';
import type { Column, TableOptions } from 'components/Table/types.ts';
import type { TablePlayingEntity } from 'types.ts';
import { usePremierLeagueContext } from 'contexts/PremierLeagueContext';
import { formatEntityToTable } from 'utils.ts';
import Spinner from 'components/Spinner';
import ErrorMessage from 'components/ErrorMessage';

const columns: Column<TablePlayingEntity>[] = [
  { title: 'Team', key: 'name', width: 130, sortable: true },
  { title: 'P', key: 'matchesPlayed', width: 40, sortable: true },
  { title: 'W', key: 'wins', width: 40, sortable: true },
  { title: 'D', key: 'draws', width: 40, sortable: true },
  { title: 'L', key: 'losses', width: 40, sortable: true },
  {
    title: 'Pts',
    key: 'points',
    width: 60,
    sortable: true,
  },
];

const tableOptions: TableOptions<TablePlayingEntity> = {
  defaultSort: { field: 'points', order: 'asc' },
};

const ScoreTable = () => {
  const { data, error, isLoading } = usePremierLeagueContext();
  const tableData = data.map((d) => formatEntityToTable(d));

  if (isLoading) {
    return (
      <div className='flex justify-center py-3'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return <Table columns={columns} data={tableData} options={tableOptions} />;
};

export default ScoreTable;
