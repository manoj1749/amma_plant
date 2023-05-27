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
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth, {firebase} from '@react-native-firebase/auth';
import {login, loginAction, setUser} from '../redux/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setTokenId, storeUserDetails} from '../utiltis/utilitis';
import Loader from '../components/Loader';
// import {API_URL} from '@env';
const SignInPage = ({navigation}) => {
  // console.log(API_URL);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '936424476577-femae4e8tuslpm8rk9adpcr6bknt4kch.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const onPressGoogle = async () => {
    setLoading(true);
    try {
      GoogleSignin.hasPlayServices();
      const data = await GoogleSignin.signIn();
      console.log('data', data);
      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
      );
      const accessToken = data.idToken;
      AsyncStorage.setItem(
        '@loggedInUserID:googleCredentialAccessToken',
        accessToken,
      );
      return auth()
        .signInWithCredential(credential)
        .then(result => {
          setLoading(false);
          const user = result.user;
          AsyncStorage.setItem('@loggedInUserID:id', user.uid);
          const userDict = {
            id: user.uid,
            fullname: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          };
          const data = {
            ...userDict,
            appIdentifier: 'rn-android-universal-listings',
          };
          auth().onAuthStateChanged(res =>{
            console.log(res)
            AsyncStorage.setItem('@loggedInUserID:id', user.uid);
          })

          firestore().collection('users').doc(user.uid).set(data);
          dispatch(login(userDict));
          navigation.navigate('DrawerStack');
        });
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }

    // GoogleSignin.signIn().then(data => {
    // Create a new Firebase credential with the token
    // const credential = firebase.auth.GoogleAuthProvider.credential(
    //   data.idToken,
    // );
    // Login with the credential
    // const accessToken = data.idToken;
    // AsyncStorage.setItem(
    //   '@loggedInUserID:googleCredentialAccessToken',
    //   accessToken,
    // );
    // return auth().signInWithCredential(credential);
    // });
    // .then(result => {
    //   var user = result.user;
    //   AsyncStorage.setItem('@loggedInUserID:id', user.uid);
    //   var userDict = {
    //     id: user.uid,
    //     fullname: user.displayName,
    //     email: user.email,
    //     photoURL: user.photoURL,
    //   };
    //   var data = {
    //     ...userDict,
    //     appIdentifier: 'rn-android-universal-listings',
    //   };
    //   console.log('data', data);
    //   firestore().collection('users').doc(user.uid).set(data);
    //   // dispatch(login(userDict));
    //   navigation.navigate('DrawerStack', {
    //     user: userDict,
    //   });
    // });
    // .catch(error => {
    //   const {message} = error;
    //   // setLoading(false);
    //   alert(message);
    // });
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <ImageBackground
            source={require('../assets/image/plant.jpg')}
            style={styles.backgroundImage}>
            <View style={styles.overlay}>
              <View style={{marginTop: 100}}>
                <TouchableOpacity onPress={onPressGoogle}>
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
      )}
    </>
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
