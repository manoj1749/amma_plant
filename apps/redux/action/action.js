import axios from 'axios';

const serverUrl = 'http://192.168.18.43:4848/api';

export const login = idToken => async dispatch => {
  try {
    dispatch({type: 'loginRequest'});
    await axios.post(`${serverUrl}/google-signin`, {idToken});
    dispatch({type: 'loginSuccess'});
  } catch (error) {
    dispatch({type: 'loginFailure', payload: error.response.data.message});
  }
};
export const logout = idToken => async dispatch => {
  try {
    dispatch({type: 'logoutRequest'});

    await axios.post(`${serverUrl}/signOut`, {idToken});
    dispatch({type: 'logoutSuccess'});
  } catch (error) {
    dispatch({
      type: 'logoutFailure',
      payload: error.response.data.message,
    });
  }
};

export const userDetails = id => async dispatch => {
  try {
    console.log('clicked');
    dispatch({type: 'userDetailsRequest'});
    console.log(`${serverUrl}/google-signin`);

    const data = await axios.get(
      `http://192.168.18.43:4848/api/user/userDetails/${id}`,
    );
    dispatch({type: 'userDetailsSuccess', payload: data});
  } catch (error) {
    dispatch({
      type: 'userDetailsFailure',
      payload: error.response.data.message,
    });
  }
};
