import AsyncStorage from '@react-native-async-storage/async-storage';
// import {AsyncStorage} from 'react-native';

async function setTokenId(tokenId) {
  try {
    await AsyncStorage.setItem('token', tokenId);
    console.log('Token ID set successfully.');
  } catch (error) {
    console.error('Error while setting token ID:', error);
  }
}

async function getTokenId() {
  try {
    const tokenId = await AsyncStorage.getItem('token');
    console.log('Token ID retrieved successfully.');
    return tokenId;
  } catch (error) {
    console.error('Error while getting token ID:', error);
  }
}
async function removeTokenId() {
  try {
    const tokenId = await AsyncStorage.removeItem('userDetails');
    console.log('Token ID retrieved successfully.');
    return tokenId;
  } catch (error) {
    console.error('Error while getting token ID:', error);
  }
}
const storeUserDetails = async userDetails => {
  try {
    const jsonUserDetails = JSON.stringify(userDetails);
    await AsyncStorage.setItem('userDetails', jsonUserDetails);
  } catch (error) {
    console.log(error);
  }
};
const getUserDetails = async () => {
  try {
    const jsonUserDetails = await AsyncStorage.getItem('userDetails');
    return jsonUserDetails != null ? JSON.parse(jsonUserDetails) : null;
  } catch (error) {
    console.log(error);
  }
};
export {
  setTokenId,
  getTokenId,
  removeTokenId,
  storeUserDetails,
  getUserDetails,
};
