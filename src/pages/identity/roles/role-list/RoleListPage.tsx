import { Fragment, useState } from 'react';

import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle
} from '@/partials/toolbar';

import { RoleListContent } from '.';
import { useLayout } from '@/providers';
import { AddRoleModal } from '../blocks/add-role-modal/AddRoleModal';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';

import { deleteRoles } from '@/store/slices/roles/actions';
import { selectSelectedRoleIds } from '@/store/slices/roles/selectors';
import { useAppDispatch } from '@/store';
import { useDataGrid } from '@/components';


const RoleListPage = () => {
  const { currentLayout } = useLayout();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const dispatch = useAppDispatch();


  const handleOpenModal = () => setIsAddModalOpen(true);
  const handleCloseModal = () => setIsAddModalOpen(false);

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedIds(selectedIds);
  };

  const handleBulkDelete = () => {

    if (selectedIds.length > 0) {
      dispatch(deleteRoles(selectedIds));
    }
  
  };

  return (
    <Fragment>
      {currentLayout?.name === 'demo1-layout' && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              <ToolbarDescription>
                <div className="flex items-center flex-wrap gap-1.5 font-medium">
                  لیست نقش های کاربری در سیستم
                </div>
              </ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <div className="flex gap-2">
                {selectedIds.length > 0 && (
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={handleBulkDelete}
                  >
                    حذف {selectedIds.length} مورد انتخاب شده
                  </Button>
                )}
                <Button 
                  onClick={handleOpenModal} 
                  variant="default" 
                  size="sm"
                >
                  افزودن نقش کاربری
                </Button>
              </div>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}

      <Container>
        <RoleListContent onSelectionChange={handleSelectionChange} />
      </Container>

      <AddRoleModal isOpen={isAddModalOpen} onClose={handleCloseModal} />
    </Fragment>
  );
};

export { RoleListPage  };
