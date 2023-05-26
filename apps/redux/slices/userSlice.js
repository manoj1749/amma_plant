import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import network from '../../utiltis/newtwork';
import axios from 'axios';

const initialState = {
  users: [],
  loggedIn: false,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.users = action.payload;
      state.loggedIn = true;
      state.loading = false;
    },
    logout: (state, action) => {
      state.loggedIn = false;
      state.users = [];
    },
  },
});

export const {login, logout} = userSlice.actions;
export const selectUsersDetails = state => state.user.users;
export const selectLoggedInStatus = state => state.user.loggedIn;
export const selectLoadingStatus = state => state.user.loading;
export default userSlice.reducer;
