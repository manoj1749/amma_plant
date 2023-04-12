import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import homeScreen from '../screens/HomePage';
import AddImage from './AddImage.stack';
import {Avatar, Button} from 'react-native-paper';
import {selectUser} from '../features/auth/userSlice';
import {useSelector} from 'react-redux';
import UserProfile from './UserProfile.stack';

const AppStack = createStackNavigator();
const AppStacks = () => {
  const {user} = useSelector(selectUser);

  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Home"
        component={homeScreen}
        options={{
          headerShown: false,
        }}
      />

      <AppStack.Screen
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

                // source={{uri: user.user.photo}}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <AppStack.Screen
        name="Profile"
        component={UserProfile}
        options={{
          headerShown: true,
          title: 'Profile',
        }}
      />
    </AppStack.Navigator>
  );
};

export default AppStacks;
