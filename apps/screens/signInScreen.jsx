import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth, {firebase} from '@react-native-firebase/auth';
import {loginAction, setUser} from '../redux/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setTokenId, storeUserDetails} from '../utiltis/utilitis';
// import {API_URL} from '@env';
const SignInPage = ({navigation}) => {
  // console.log(API_URL);
  // const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const {user, loggedIn} = useSelector(state => state.user);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '814407182169-57gk9a8i2plth612gk3ont22fbt3emmu.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const firebaseGoogleLogin = async () => {
    try {
      // add any configuration settings here:
      await GoogleSignin.hasPlayServices();
      const {idToken, user} = await GoogleSignin.signIn();

      storeUserDetails({id: user.id, token: idToken, isAuthenticated: true});
      dispatch(loginAction({idToken}));
    } catch (error) {
      console.log(error);
      e.log('some other error happened');
    }
  };

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({userInfo: userInfo, loggedIn: true});
      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
        console.log('operation (f.e. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('play services not available or outdated');
      } else {
        // some other error happened
        console.log('some other error happened');
      }
    }
  };

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      // this.setState({userInfo});
      dispatch(setUser(userInfo));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        console.log('user has not signed in yet');
        // this.setState({loggedIn: false});
        dispatch(setUser({loggedIn: false}));
      } else {
        // some other error
        console.log('some other error happened');
        // this.setState({loggedIn: false});
        dispatch(setUser({loggedIn: false}));
      }
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/image/plant.jpg')}
        style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <View style={{marginTop: 100}}>
            <TouchableOpacity onPress={firebaseGoogleLogin}>
              <View style={styles.button}>
                <Image
                  style={{width: 30, height: 30, marginHorizontal: 10}}
                  source={require('../assets/image/google.png')}
                />
                <Text style={styles.buttonText}>Sign In with Google</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.button}>
                <Image
                  style={{width: 30, height: 30, marginHorizontal: 10}}
                  source={require('../assets/image/apple.png')}
                />
                <Text style={styles.buttonText}>Sign In with Apple</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    height: 80,
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    lineHeight: 84,
    letterSpacing: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default SignInPage;
