import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {login} from '../redux/slices/userSlice';
export default function Splash({navigation}) {
  const [animating, setAnimating] = React.useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    tryToLoginFirst();
    setTimeout(async () => {
      setAnimating(true);
      const user = await AsyncStorage.getItem('@loggedInUserID:id');
      navigation.replace(user ? 'Home' : 'Login');
    }, 1000);
  }, []);
  async function tryToLoginFirst() {
    const id = await AsyncStorage.getItem('@loggedInUserID:id');
    const googleToken = await AsyncStorage.getItem(
      '@loggedInUserID:googleCredentialAccessToken',
    );
    if (
      id != null &&
      id.length > 0 &&
      googleToken != null &&
      googleToken.length > 0
    ) {
      const credential =
        firebase.auth.GoogleAuthProvider.credential(googleToken);
      auth()
        .signInWithCredential(credential)
        .then(result => {
          const user = result.user;

          const userDict = {
            id: user.uid,
            fullname: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          };
          console.log(userDict, 'eeeeeeeeeeeeeeeeeeeee');
          dispatch(login(userDict));
        })
        .catch(error => {
          console.log(error);
        });
      return;
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <LottieView
          source={require('../assets/image/splash.json')}
          autoPlay
          loop
          style={{width: '80%'}}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontWeight: '800',
    fontSize: 30,
    color: 'white',
  },
});
