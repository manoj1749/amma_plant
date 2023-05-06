import {createReducer} from '@reduxjs/toolkit';

export const authReducer = createReducer(
  {isAuthenticated: false},
  {
    loginRequest: state => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      console.log('kdkdkdjj');
      state.loading = false;
      state.isAuthenticated = true;
      //   state.user = action.payload.user;
      state.message = action.payload.message;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logoutRequest: state => {
      state.loading = true;
    },
    logoutSuccess: state => {
      state.loading = false;
      state.isAuthenticated = false;
      //   state.user = null;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    },
  },
);
export const userDetailsReducer = createReducer(
  {},
  {
    userDetailsRequest: state => {
      state.loading = true;
    },
    userDetailsSuccess: (state, action) => {
      console.log(action);
      state.loading = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    userDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
);
