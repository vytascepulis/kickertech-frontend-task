import Table from 'components/Table';
import type { Column, TableOptions } from 'components/Table/types.ts';
import type { GameData, TablePlayingEntity } from 'types.ts';
import { formatEntityToTable } from 'utils.ts';

const columns: Column<TablePlayingEntity>[] = [
  {
    title: 'Team',
    key: 'name',
    width: 130,
    sortable: true,
    className: 'text-start',
  },
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
  headerClassName: 'bg-gray-100 p-2 font-semibold',
  rowClassName:
    'p-2 border-b border-gray-200 transition-colors hover:bg-gray-50',
};

interface Props {
  data: GameData;
}

const ScoreTable = ({ data }: Props) => {
  const tableData = data.participants.map((p) =>
    formatEntityToTable(p, data.matches)
  );

  if (!data.participants.length) {
    return <p className='mt-4 text-sm font-bold text-gray-700'>No data</p>;
  }

  return <Table columns={columns} data={tableData} options={tableOptions} />;
};

export default ScoreTable;
