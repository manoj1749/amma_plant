import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectLoading,
  selectLoggedIn,
  selectUser,
  setLoggedIn,
} from '../redux/slices/userSlice';
import HomeNavigator from './HomeNavigator';
import AuthNavigator from './AuthNavigator';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppNavigator = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isLoggedIns = useSelector(selectLoggedIn);
  console.log(isLoading);
  React.useEffect(() => {
    // Check if user is logged in on app startup
    AsyncStorage.getItem('token')
      .then(userData => {
        if (userData) {
          dispatch(setLoggedIn({isLoggedIn: true}));
        }
      })
      .catch(error => console.error(error));
  }, []);
  const userDetails = useSelector(selectUser);
  console.log('userDetails', userDetails);
  return isLoading ? (
    <Loader />
  ) : (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
