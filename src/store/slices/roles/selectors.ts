import { RolesState } from './rolesSlice';
import { createSelector } from '@reduxjs/toolkit';

export const selectRolesState = (state: { roles: RolesState }) => state.roles;

export const selectRoles = createSelector(
  selectRolesState,
  (rolesState) => rolesState.items
);

export const selectLoading = createSelector(
  selectRolesState,
  (rolesState) => rolesState.loading
);

export const selectError = createSelector(
  selectRolesState,
  (rolesState) => rolesState.error
);

export const selectRoleById = (id: string) => createSelector(
  selectRoles,
  (roles) => roles.find(role => role.id === id)
);

export const selectSelectedRoleIds = createSelector(
  selectRolesState,
  (rolesState) => rolesState.selectedIds
); 