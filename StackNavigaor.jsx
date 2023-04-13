import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import homeScreen from './stacks/HomePage.stack';
import AddImage from './stacks/AddImage.stack';
import {Avatar, Button} from 'react-native-paper';
import {selectUser, setUser} from './features/auth/userSlice';
import {useSelector} from 'react-redux';
import UserProfile from './stacks/UserProfile.stack';
import SignInPage from './screens/signInScreen';
import {firebase} from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const StackNavigaor = () => {
  const {user} = useSelector(selectUser);
  console.log('userrrrr', user);
  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(function ({_user}) {
  //     if (user) {
  //       // currentUser should be non null.
  //       console.log('users', _user);
  //       // useSelector(setUser({user}));
  //     } else {
  //       // no user logged in. currentUser is null.
  //     }
  //   });
  // }, []);
  return (
    <Stack.Navigator>
      {user ? (
        <>
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
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile')}>
                  <Avatar.Image
                    size={34}
                    style={{marginHorizontal: 20, backgroundColor: 'salmon'}}
                    source={{uri: user && user.user && user.user.user.photo}}
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
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={SignInPage}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigaor;
