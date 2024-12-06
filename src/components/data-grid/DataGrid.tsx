import { ReactNode } from 'react';
import { DataGridInner, DataGridProvider, useDataGrid } from '.';
import {
  ColumnFiltersState,
  Row,
  RowSelectionState,
  SortingState,
  Table,
  TableOptions
} from '@tanstack/react-table';

export type TDataGridLayoutCellSpacing = 'xs' | 'md' | 'sm' | 'lg';

export type TDataGridSelectedRowIds = Set<string>;

export type TDataGridRequestParams = {
  pageIndex: number;
  pageSize: number;
  sorting?: SortingState;
  columnFilters?: ColumnFiltersState;
};

export interface TDataGridProps<TData extends object> {
  columns: any[];
  data?: TData[];
  selectedRows?: string[];
  rowSelection?: boolean | ((row: Row<TData>) => boolean);
  getRowId?: TableOptions<TData>['getRowId'];
  onRowSelectionChange?: (state: RowSelectionState, table?: Table<TData>) => void;
  messages?: {
    loading?: ReactNode | string;
    empty?: ReactNode | string;
  };
  layout?: {
    cellSpacing?: TDataGridLayoutCellSpacing;
    cellBorder?: boolean;
    card?: boolean;
    classes?: {
      table?: '';
      container?: '';
      root?: '';
    };
  };
  pagination?: {
    page?: number;
    size?: number;
    sizes?: number[];
    sizesInfo?: string;
    sizesLabel?: string;
    sizesDescription?: string;
    more?: boolean;
    moreLimit?: number;
    info?: string;
  };
  sorting?: { id: string; desc?: boolean }[];
  toolbar?: ReactNode;
  filters?: { id: string; value: unknown }[];
  serverSide?: boolean;
  onFetchData?: (params: TDataGridRequestParams) => Promise<any>;
  children?: ReactNode;
}
export const DataGrid = <TData extends object>(props: TDataGridProps<TData>) => {
  const { resetRowSelection, ...otherContext } = useDataGrid();

  return (
    <DataGridProvider {...props}>
      <DataGridInner />
    </DataGridProvider>
  );
};

