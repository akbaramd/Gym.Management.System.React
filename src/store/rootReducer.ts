import { combineReducers } from '@reduxjs/toolkit';
import rolesReducer from './slices/roles/rolesSlice';

const rootReducer = combineReducers({
  roles: rolesReducer,
  // سایر ریدیوسرها در اینجا اضافه می‌شوند
});

export default rootReducer; 