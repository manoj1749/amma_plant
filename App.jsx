/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {enableLatestRenderer} from 'react-native-maps';

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import SignInPage from './screens/signInScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from './screens/HomePage';
import {selectUser} from './features/auth/userSlice';
import {useSelector} from 'react-redux';
import AppStacks from './stacks/AppStack';
import AuthStacks from './stacks/AuthStack';

const Stack = createStackNavigator();
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const user = useSelector(selectUser);
  return (
    <NavigationContainer>
      {Object.keys(user).length !== 0 ? <AppStacks /> : <AuthStacks />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
});

export default App;
