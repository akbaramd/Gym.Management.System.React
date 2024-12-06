import { Fragment } from 'react';

import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle
} from '@/partials/toolbar';

import { UserListContent } from '.';
import { useLayout } from '@/providers';

const UserListPage = () => {
  const { currentLayout } = useLayout();

  return (
    <Fragment>
      {currentLayout?.name === 'demo1-layout' && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              <ToolbarDescription>
                <div className="flex items-center flex-wrap gap-1.5 font-medium">
                  لیست کاربران ثبت نام شده
                </div>
              </ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <a href="#" className="btn btn-sm btn-primary">
                افزودن کاربر
              </a>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}

      <Container>
        <UserListContent />
      </Container>
    </Fragment>
  );
};

export { UserListPage  };
