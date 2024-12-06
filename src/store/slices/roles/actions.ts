import { createAsyncThunk } from '@reduxjs/toolkit';
import { IRolesData } from './rolesSlice';
import { RolesAPI } from '@/services/api/roles.api';
import { string } from 'yup';

export const fetchRoles = createAsyncThunk(
  'roles/fetchRoles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await RolesAPI.fetchRoles();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'خطا در دریافت نقش‌ها');
    }
  }
);

export const updateRole = createAsyncThunk(
  'roles/updateRole',
  async (role: IRolesData, { rejectWithValue }) => {
    try {
      const response = await RolesAPI.updateRole(role);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'خطا در به‌روزرسانی نقش');
    }
  }
);

export const createRole = createAsyncThunk(
  'roles/createRole',
  async (role: Omit<IRolesData, 'id'>, { rejectWithValue }) => {
    try {
      const response = await RolesAPI.createRole(role);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'خطا در ایجاد نقش');
    }
  }
);

export const deleteRole = createAsyncThunk(
  'roles/deleteRole',
  async (id: string, { rejectWithValue }) => {
    try {
      await RolesAPI.deleteRole(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'خطا در حذف نقش');
    }
  }
);

export const deleteRoles = createAsyncThunk(
  'roles/deleteRoles',
  async (ids: string[], { rejectWithValue }) => {
    try {
    
      await Promise.all(ids.map(id => RolesAPI.deleteRole(id)));
      return ids;
    } catch (error: any) {
      return rejectWithValue(error.message || 'خطا در حذف نقش‌ها');
    }
  }
); 