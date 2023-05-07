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

import {selectUser} from './apps/redux/slices/userSlice';
import {Provider, useSelector} from 'react-redux';

import {store} from './apps/redux/store';
import AppNavigator from './apps/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const user = useSelector(selectUser);
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
});

export default App;
