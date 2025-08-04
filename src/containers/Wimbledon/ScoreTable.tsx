import Table from 'components/Table';
import type { Column, TableOptions } from 'components/Table/types.ts';
import type { GameData, TablePlayingEntity } from 'types.ts';
import { formatEntityToTable } from 'utils.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';

const columns: Column<TablePlayingEntity>[] = [
  {
    title: 'Player',
    key: 'name',
    width: 130,
    sortable: true,
  },
  {
    title: 'M',
    key: 'matchesPlayed',
    width: 40,
    sortable: true,
    className: 'text-center',
  },
  {
    title: 'W',
    key: 'wins',
    width: 40,
    className: 'text-center',
    render: ({ wins }) => (
      <>
        {wins}{' '}
        <FontAwesomeIcon size='sm' className='text-green-500' icon={faCheck} />
      </>
    ),
  },
  {
    title: 'L',
    key: 'losses',
    width: 40,
    className: 'text-center',

    render: ({ losses }) => (
      <>
        {losses}{' '}
        <FontAwesomeIcon size='xs' className='text-red-500' icon={faX} />
      </>
    ),
  },
  {
    title: 'Pts',
    key: 'points',
    width: 60,
    sortable: true,
    className: 'font-bold text-center',
  },
];

const tableOptions: TableOptions<TablePlayingEntity> = {
  defaultSort: { field: 'points', order: 'asc' },
  headerClassName: 'p-2 font-bold bg-gray-100 ',
  rowClassName:
    'p-2 transition-colors hover:bg-gray-50 border-b border-gray-300',
};

interface Props {
  data: GameData;
}

const ScoreTable = ({ data }: Props) => {
  const tableData = data.participants.map((p) =>
    formatEntityToTable(p, data.matches)
  );

  if (!data.participants.length) {
    return <p className='mt-4 text-sm font-bold text-gray-600'>No data</p>;
  }

  return <Table columns={columns} data={tableData} options={tableOptions} />;
};

export default ScoreTable;
