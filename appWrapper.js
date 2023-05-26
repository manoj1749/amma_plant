import {View, Text} from 'react-native';
import React from 'react';
import {store} from './apps/redux/store';
import {Provider} from 'react-redux';
import App from './App';
import AppNavigator from './apps/navigation/AppNavigator';
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default AppWrapper;
