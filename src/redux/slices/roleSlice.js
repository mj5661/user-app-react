import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  roles: [
    { key: 'admin', label: 'Admin' },
    { key: 'user', label: 'User' },
    { key: 'guest', label: 'Guest' },
  ],
}

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    AddRole: (state, action) => {
      state.loading = false;
      state.roles = [...state.roles, action.payload];
    },
    DeleteRole: (state, action) => {
      const updatedRoles = state.roles.filter((roleObj) => roleObj.key !== action.payload);
      state.loading = false;
      state.roles = updatedRoles;
    },
    UpdateRole: (state, action) => {
      const updatedRoles = state.roles.map((roleObj) =>
        roleObj.key === action.payload.key ? { key: action.payload.label.toLowerCase(), label: action.payload.label } : roleObj
      );
      state.loading = false;
      state.roles = updatedRoles;
    }
  },
})

export const { AddRole, DeleteRole, UpdateRole } = roleSlice.actions;

export default roleSlice.reducer;