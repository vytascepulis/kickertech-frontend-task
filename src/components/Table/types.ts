export interface Column<T> {
  title: string;
  width: number;
  key: keyof T;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface SortOptions<T> {
  field: Column<T>['key'];
  order: 'asc' | 'desc';
}

export interface TableOptions<T> {
  defaultSort?: SortOptions<T>;
  headerClassName?: string;
  rowClassName?: string;
}
