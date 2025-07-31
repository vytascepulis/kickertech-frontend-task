import type {
  Column,
  SortOptions,
  TableOptions,
} from 'components/Table/types.ts';
import { useEffect, useState } from 'react';
import { handleSort } from 'components/Table/utils.ts';

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  options?: TableOptions<T>;
}

const rowClassname = 'flex flex-row';

const Table = <T,>({ columns, data, options }: Props<T>) => {
  const [sort, setSort] = useState<SortOptions<T> | undefined>(
    options?.defaultSort
  );

  useEffect(() => {
    console.log(handleSort(data, columns, sort));
  }, []);

  return (
    <div className=''>
      <div className={rowClassname}>
        {columns.map((column) => (
          <div>{column.title}</div>
        ))}
      </div>
      {handleSort(data, columns, sort).map((item) => {
        return (
          <div className={rowClassname}>
            {columns.map((column) => {
              const value = column.render
                ? column.render(item)
                : (item[column.key] as React.ReactNode);

              return <div>{value}</div>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Table;
