import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchRoles, updateRole, createRole, deleteRoles } from './actions';

export interface IRolesData {
  id: string;
  title: string;
  description?: string;
}

export interface RolesState {
  items: IRolesData[];
  loading: boolean;
  error: string | null;
  selectedIds: string[];
}

const initialState: RolesState = {
  items: [],
  loading: false,
  error: null,
  selectedIds: [],
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<IRolesData[]>) => {
      state.items = action.payload;
    },
    setSelectedRoleIds: (state, action: PayloadAction<string[]>) => {
      state.selectedIds = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchRoles
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // createRole
      .addCase(createRole.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(createRole.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // updateRole
      .addCase(updateRole.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (role) => role.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // deleteRoles
      .addCase(deleteRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          role => !action.payload.includes(role.id)
        );
        state.selectedIds = [];
      })
      .addCase(deleteRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setRoles, setSelectedRoleIds } = rolesSlice.actions;
export default rolesSlice.reducer; 