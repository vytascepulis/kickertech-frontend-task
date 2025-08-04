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

const rowClassName = 'flex flex-row items-center w-full';

const Table = <T,>({ columns, data, options }: Props<T>) => {
  const [sort, setSort] = useState<SortOptions<T> | undefined>(
    options?.defaultSort
  );

  const onSort = (column: Column<T>) => {
    if (!column.sortable) return;
    const nextSort = getNextSort(column, sort);
    if (!nextSort) {
      return setSort(undefined);
    }

    setSort({ field: column.key, order: nextSort });
  };

  const renderSortIcon = (column: Column<T>) => {
    if (sort?.field !== column.key) return;

    const arrowClassName = 'text-sm';

    if (sort.order === 'asc') {
      return <FontAwesomeIcon className={arrowClassName} icon={faArrowUp} />;
    }

    return <FontAwesomeIcon className={arrowClassName} icon={faArrowDown} />;
  };

  return (
    <div className='overflow-x-auto'>
      <div className='min-w-min'>
        <div
          className={twMerge(
            'flex pr-5!',
            rowClassName,
            options?.headerClassName
          )}
        >
          {columns.map((column) => (
            <a
              key={column.key as string}
              onClick={() => onSort(column)}
              style={{ minWidth: `${column.width}px`, flex: 1 }}
              className={twMerge(
                column.sortable && 'cursor-pointer',
                column.className
              )}
            >
              {column.title}
              {renderSortIcon(column)}
            </a>
          ))}
        </div>
        <div className='max-h-[300px] overflow-y-scroll'>
          {handleSort(data, columns, sort).map((item, idx) => (
            <div
              key={idx}
              className={twMerge('flex', rowClassName, options?.rowClassName)}
            >
              {columns.map((column) => {
                const value = column.render
                  ? column.render(item)
                  : (item[column.key] as React.ReactNode);
                return (
                  <div
                    key={`${column.key as string}-${idx}`}
                    style={{ minWidth: `${column.width}px`, flex: 1 }}
                    className={twMerge(column.className)}
                  >
                    {value}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
