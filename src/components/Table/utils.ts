import type { Column, SortOptions } from 'components/Table/types.ts';

export const handleSort = <T>(
  data: T[],
  columns: Column<T>[],
  sortOptions?: SortOptions<T>
) => {
  if (!sortOptions) {
    return data;
  }

  const column = columns.find((c) => c.key === sortOptions.field);

  const { field, order } = sortOptions;

  return data.sort((a, b) => {
    const valA = column?.render ? column.render(a) : a[field];
    const valB = column?.render ? column.render(b) : b[field];

    if (order === 'asc') {
      return (valA || 0) > (valB || 0) ? 1 : -1;
    }

    return (valA || 0) < (valB || 0) ? 1 : -1;
  });
};
