import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import network from '../../utiltis/newtwork';
import axios from 'axios';

const initialState = {
  userDetails: [],
  isLoading: false,
  loggedIn: false,
};
export const loginAction = createAsyncThunk('user/login', async isToken => {
  console.log(isToken);
  const res = await axios.post(
    'https://amma-plant.onrender.com/api/google-signin',
    isToken,
  );
  const data = await res.data;
  return data;
});
export const signoutAction = createAsyncThunk('user/signout', async isToken => {
  console.log(isToken);
  const res = await axios.post(
    'https://amma-plant.onrender.com/api/signOut',
    isToken,
  );
  const data = await res.data;
  return data;
});
export const getUserDetail = createAsyncThunk('user/userDetails', async id => {
  console.log('id', id);
  const res = await axios.get(
    `https://amma-plant.onrender.com/api/user/userDetails/${id}`,
  );
  const data = await res.data;
  console.log(data);
  return data;
});
export const uploadPost = createAsyncThunk('user/uploadImage', async posts => {
  console.log('id------------------', posts);
  let newPosts = new FormData();
  newPosts.append('image', {
    uri: posts.image,
    type: 'image/jpeg',
    name: 'image.jpg',
  });
  body.append('Content-Type', 'image/png');
  newPosts.append('description', posts.description);
  newPosts.append('location', posts.location);
  newPosts.append('tags', posts.tags);
  const res = await axios.post(
    `https://amma-plant.onrender.com/api/user/post/upload`,
    uploadData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        otherHeader: 'foo',
      },
    },
  );
  const data = await res.data;
  return data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      console.log('hello');
      state.loggedIn = action.payload;
    },
    // clearUser: state => {
    //   state.user = null;
    //   state.isLoading = false;
    // },
  },
  extraReducers: builder => {
    console.log(builder);
    builder.addCase(loginAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loggedIn = true;
      state.isLoading = false;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loggedIn = false;
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(getUserDetail.pending, (state, action) => {
      // state.isLoading = true;
    });
    builder.addCase(getUserDetail.fulfilled, (state, action) => {
      state.userDetails = [action.payload];
      // state.isLoading = false;
    });
    builder.addCase(uploadPost.pending, (state, action) => {
      state.uploaded = true;
    });
    builder.addCase(uploadPost.fulfilled, (state, action) => {
      alert('yes');
      state.userDetails = state.userDetails;
      state.uploaded = false;
    });

    builder.addCase(signoutAction.fulfilled, (state, action) => {
      state.loggedIn = false;
      state.userDetails = [];
    });
    builder.addCase(signoutAction.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const {setLoggedIn, clearUser} = userSlice.actions;
export const selectUser = state => state.user.userDetails;
export const selectLoggedIn = state => state.user.loggedIn;
export const selectLoading = state => state.user.isLoading;
export const selectuploaded = state => state.user.uploaded;
export default userSlice.reducer;
