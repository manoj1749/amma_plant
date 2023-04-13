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
import HomePage from './stacks/HomePage.stack';
import {selectUser} from './features/auth/userSlice';
import {useSelector} from 'react-redux';
import StackNavigaor from './StackNavigaor';

const Stack = createStackNavigator();
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const user = useSelector(selectUser);
  return (
    <NavigationContainer>
      <StackNavigaor />
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
