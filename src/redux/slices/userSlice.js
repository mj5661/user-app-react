import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  users: [
    {
      id: 1,
      name: "User 1",
      email:"test@gmail.com",
      username: "user1",
      mobile: "9912901901",
      roleKey: "admin",
      password: "Test@123" 
    },
    {
      id: 2,
      name: "User 1",
      email:"test@gmail.com",
      username: "user1",
      mobile: "9912901901",
      roleKey: "admin",
      password: "Test@123" 
    },
    {
      id: 3,
      name: "User 1",
      email:"test@gmail.com",
      username: "user1",
      mobile: "9912901901",
      roleKey: "user",
      password: "Test@123" 
    },
  ],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    AddUser: (state, { payload: userObj }) => {
      state.loading = false;
      state.users = [...state.users, userObj];
    },
    DeleteUser: (state, { payload: id }) => {
      const updatedUsers = state.users.filter((userObj) => userObj.id !== id);
      state.loading = false;
      state.users = updatedUsers;
    },
    UpdateUser: (state, action) => {
      const updatedUsers = state.users.map((userObj) =>
        userObj.id === action.payload.id ? action.payload : userObj
      );
      state.loading = false;
      state.users = updatedUsers;
    }
  },
})

export const { AddUser, DeleteUser, UpdateUser } = userSlice.actions;

export default userSlice.reducer;