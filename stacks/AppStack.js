import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import homeScreen from '../screens/HomePage';

const AppStack = createStackNavigator();
const AppStacks = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Login"
        component={homeScreen}
        options={{
          headerShown: false,
        }}
      />
    </AppStack.Navigator>
  );
};

export default AppStacks;
