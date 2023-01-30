import { configureStore } from '@reduxjs/toolkit';
import { userReducer, roleReducer } from './slices';

export const store = configureStore({
  reducer: {
    user: userReducer,
    role: roleReducer,
  },
})