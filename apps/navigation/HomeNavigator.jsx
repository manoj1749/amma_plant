import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserProfile from '../screens/UserProfileScreen';
import AddImage from '../screens/AddImageScreen';
import homeScreen from '../screens/HomeScreen';
import splashScreen from '../screens/splashScreen';
import {Avatar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {selectUser} from '../redux/slices/userSlice';

const Stack = createStackNavigator();
const HomeNavigator = () => {
  const [userDetails] = useSelector(selectUser);
  console.log(userDetails);

  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="splash"
        component={splashScreen}
        options={{
          headerShown: false,
        }}
      /> */}
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
                source={{uri: userDetails && userDetails.picture}}
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

export default HomeNavigator;
