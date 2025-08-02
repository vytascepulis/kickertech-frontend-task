import type {
  Column,
  SortOptions,
  TableOptions,
} from 'components/Table/types.ts';
import { useState } from 'react';
import { getNextSort, handleSort } from 'components/Table/utils.ts';
import { twMerge } from 'tailwind-merge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  options?: TableOptions<T>;
}

const rowClassName = 'flex flex-row w-full';
const colClassName = '';

const Table = <T,>({ columns, data, options }: Props<T>) => {
  const [sort, setSort] = useState<SortOptions<T> | undefined>(
    options?.defaultSort
  );

  const onSort = (column: Column<T>) => {
    const nextSort = getNextSort(column, sort);
    if (!nextSort) {
      return setSort(undefined);
    }

    setSort({ field: column.key, order: nextSort });
  };

  const renderSortIcon = (column: Column<T>) => {
    if (sort?.field !== column.key) return;

    const arrowClassName = 'text-gray-600 text-sm';

    if (sort.order === 'asc') {
      return <FontAwesomeIcon className={arrowClassName} icon={faArrowUp} />;
    }

    return <FontAwesomeIcon className={arrowClassName} icon={faArrowDown} />;
  };

  return (
    <div className='overflow-x-auto'>
      <div className={rowClassName}>
        {columns.map((column) => (
          <button
            key={column.key as string}
            onClick={() => onSort(column)}
            style={{ minWidth: `${column.width}px`, flex: 1 }}
            className='cursor-pointer text-start'
          >
            {column.title}
            {renderSortIcon(column)}
          </button>
        ))}
      </div>
      {handleSort(data, columns, sort).map((item, idx) => {
        return (
          <div key={idx} className={rowClassName}>
            {columns.map((column) => {
              const value = column.render
                ? column.render(item)
                : (item[column.key] as React.ReactNode);

              return (
                <div
                  key={`${column.key as string}-${idx}`}
                  className={twMerge(colClassName)}
                  style={{ minWidth: `${column.width}px`, flex: 1 }}
                >
                  {value}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Table;
