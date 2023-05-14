import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserProfile from '../screens/UserProfileScreen';
import AddImage from '../screens/AddImageScreen';
import homeScreen from '../screens/HomeScreen';
import splashScreen from '../screens/splashScreen';
import {Avatar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {selectUser, selectUsersDetails} from '../redux/slices/userSlice';
import SignInPage from '../screens/signInScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import Splash from '../screens/splashScreen';

const Stack = createStackNavigator();
const RootNavigator = () => {
  const user = useSelector(selectUsersDetails);
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Welcome"
        component={Splash}
      />
      <Stack.Screen
        name="Login"
        component={SignInPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={homeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="addImage"
        component={AddImage}
        options={({navigation, route}) => ({
          headerShown: true,
          title: 'Add Image',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Avatar.Image
                size={34}
                style={{marginHorizontal: 20, backgroundColor: 'salmon'}}
                source={{uri: user && user.photoURL}}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Profile"
        component={UserProfile}
        options={{
          headerShown: true,
          title: 'Profile',
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
