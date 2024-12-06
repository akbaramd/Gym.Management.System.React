/* eslint-disable prettier/prettier */
import { useMemo, useState, useEffect } from 'react';
import { ColumnDef, Column, RowSelectionState } from '@tanstack/react-table';
import { DataGrid, DataGridColumnHeader, KeenIcon, useDataGrid, DataGridRowSelectAll, DataGridRowSelect } from '@/components';
import { toAbsoluteUrl } from '@/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

import { EditRoleModal } from '../edit-role-modal/EditRoleModal';
import { useAppDispatch, useAppSelector } from '@/store';
import {  IRolesData } from '@/store/slices/roles/rolesSlice';
import { fetchRoles, updateRole, deleteRole } from '@/store/slices/roles/actions';

interface IColumnFilterProps<TData, TValue> {
  column: Column<TData, TValue>;
}

interface RolesProps {
  onSelectionChange: (selectedIds: string[]) => void;
}

const Roles = ({ onSelectionChange }: RolesProps) => {
  const dispatch = useAppDispatch();


  const { items: rolesData, loading } = useAppSelector((state) => state.roles);
  const [selectedRole, setSelectedRole] = useState<IRolesData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    setRowSelection({});
    onSelectionChange([]);
  }, [rolesData]);

  const ColumnInputFilter = <TData, TValue>({ column }: IColumnFilterProps<TData, TValue>) => {
    return (
      <Input
        placeholder="جستجو ..."
        value={(column.getFilterValue() as string) ?? ''}
        onChange={(event) => column.setFilterValue(event.target.value)}
        className="h-9 w-full max-w-40"
      />
    );
  };  

  const columns = useMemo<ColumnDef<IRolesData>[]>(
    () => [
      {
        accessorKey: 'id',
        header: () => <DataGridRowSelectAll />,
        cell: ({ row }) => <DataGridRowSelect row={row} />,
        enableSorting: false,
        enableHiding: false,
        meta: {
          headerClassName: 'w-0'
        }
      },
      {
        accessorFn: (row) => row.title,
        id: 'title',
        header: ({ column }) => <DataGridColumnHeader title="عنوان" column={column}/>,  
        enableSorting: true,
        cell: (info) => (
          <div 
            className="flex items-center gap-1.5 text-gray-800 font-normal cursor-pointer hover:text-primary"
            onClick={() => {
              setSelectedRole(info.row.original);
              setIsEditModalOpen(true);
            }}
          >
            <span>{info.row.original.title}</span>
          </div>
        ),
        meta: {
          headerClassName: 'min-w-[250px]',
          cellClassName: 'text-gray-700 font-normal'
        },
      },
      {
        accessorFn: (row) => row.description,
        id: 'description',
        header: ({ column }) => <DataGridColumnHeader title="توضیحات" column={column}/>,
        cell: (info) => <span>{info.row.original.description}</span>,
      }
    ],
    []
  );

  const handleRowSelection = (state: RowSelectionState) => {
    setRowSelection(state);
    const selectedRoleIds = Object.keys(state)
      .filter(key => state[key])
      .map(index => rolesData[parseInt(index)].id);
    onSelectionChange(selectedRoleIds);
  };

  const clearAllSelections = () => {
    setRowSelection({});
    onSelectionChange([]);
  };
  const Toolbar = () => {
    const [searchInput, setSearchInput] = useState('');
  
    return (
      <div className="card-header flex-wrap gap-2 border-b-0 px-5">
        <div className="flex flex-wrap gap-2 lg:gap-5">
          <div className="flex">
            <label className="input input-sm">
              <KeenIcon icon="magnifier" />
              <input
                type="text"
                placeholder="جستجو ..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </label>
          </div>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={clearAllSelections} // Call the reset selection function
          >
            Reset Selection
          </button>
        </div>
      </div>
    );
  };
  

  const handleEditRole = async (updatedRole: IRolesData) => {
    try {
      await dispatch(updateRole(updatedRole)).unwrap();
      dispatch(fetchRoles());
      setIsEditModalOpen(false);
      clearAllSelections(); // پاک کردن انتخاب‌ها بعد از عملیات
    } catch (error) {
      console.error('خطا در بروزرسانی نقش:', error);
    }
  };

  return (
    <>
      <DataGrid 
        columns={columns} 
        data={rolesData} 
        rowSelection={true} 
        onRowSelectionChange={handleRowSelection}
        pagination={{ size: 5 }}
        toolbar={<Toolbar />}
        messages={{loading:loading}}
        layout={{ card: true }}
      />

      <EditRoleModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedRole(null);
        }}
        role={selectedRole}
        onEdit={handleEditRole}
      />
    </>
  );
};

export { Roles };
