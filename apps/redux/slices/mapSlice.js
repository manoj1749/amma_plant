import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  location: {
    latitude: 8.30716,
    longitude: 77.228371,
  },
};
const mapSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      console.log('hello', action);
      state.location = action.payload;
    },
    clearLocation: state => {
      state.location = null;
    },
  },
});

export const {setLocation, clearLocation} = mapSlice.actions;
export const selectLocation = state => state.location.location;
export default mapSlice.reducer;
