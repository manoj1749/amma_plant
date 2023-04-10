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
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {setUser} from '../features/auth/userSlice';
const SignInPage = ({navigation}) => {
  // const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '814407182169-57gk9a8i2plth612gk3ont22fbt3emmu.apps.googleusercontent.com',
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // iosClientId: '', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
    isSignedIn();
  }, []);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      dispatch(setUser(userInfo));
      navigation.navigate('Home');
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };
  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!!isSignedIn) {
      getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
  };
  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      dispatch(setUser(userInfo));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };

  // GoogleSignin.configure({
  //   webClientId:
  //     '814407182169-57gk9a8i2plth612gk3ont22fbt3emmu.apps.googleusercontent.com',
  // });
  // const signInWithGoogleAync = async () => {
  //   await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

  //   const {idToken} = await GoogleSignin.signIn();

  //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  //   const user_signIn = auth().signInWithCredential(googleCredential);
  //   user_signIn
  //     .then(user => {
  //       console.log(user);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/image/plant.jpg')}
        style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <View style={{marginTop: 100}}>
            <TouchableOpacity onPress={() => signIn()}>
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
