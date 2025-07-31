export interface Column<T> {
  title?: string;
  maxWidth?: number;
  key: keyof T;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

export interface SortOptions<T> {
  field: Column<T>['key'];
  order: 'asc' | 'desc';
}

export interface TableOptions<T> {
  defaultSort?: SortOptions<T>;
}
