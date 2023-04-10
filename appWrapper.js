import {View, Text} from 'react-native';
import React from 'react';
import {store} from './app/configureStore';
import {Provider} from 'react-redux';
import App from './App';
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
