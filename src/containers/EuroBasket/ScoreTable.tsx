import Table from 'components/Table';
import type { Column, TableOptions } from 'components/Table/types.ts';
import type { GameData, TablePlayingEntity } from 'types.ts';
import { formatEntityToTable } from 'utils.ts';
import { getMatchCountry } from 'containers/EuroBasket/utils.ts';

const columns: Column<TablePlayingEntity>[] = [
  {
    title: 'Team',
    key: 'name',
    width: 130,
    className: 'text-start',
    render: ({ name }) => getMatchCountry(name),
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
    className: 'font-bold',
  },
];

const tableOptions: TableOptions<TablePlayingEntity> = {
  defaultSort: { field: 'points', order: 'asc' },
  headerClassName: 'p-2 font-bold text-white',
  rowClassName:
    'p-2 transition-colors bg-black/30 text-white hover:bg-black/40',
};

interface Props {
  data: GameData;
}

const ScoreTable = ({ data }: Props) => {
  const tableData = data.participants.map((p) =>
    formatEntityToTable(p, data.matches)
  );

  if (!data.participants.length) {
    return <p className='mt-4 text-sm font-bold text-white'>No data</p>;
  }

  return (
    <>
      <p className='mb-4 font-bold text-white'>Score Table:</p>
      <Table columns={columns} data={tableData} options={tableOptions} />
    </>
  );
};

export default ScoreTable;
