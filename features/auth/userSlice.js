import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loggedIn: false,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log('hello');
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = null;
      state.loggedIn = false;
    },
  },
});

export const {setUser, clearUser} = userSlice.actions;
export const selectUser = state => state.user;
export default userSlice.reducer;
