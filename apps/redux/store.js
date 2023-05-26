import {configureStore} from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import mapSlice from './slices/mapSlice';
export const store = configureStore({
  reducer: {user: userSlice, location: mapSlice},
});
