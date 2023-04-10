import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignInPage from '../screens/signInScreen';

const AuthStack = createStackNavigator();
const AuthStacks = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={SignInPage}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
};
export default AuthStacks;
