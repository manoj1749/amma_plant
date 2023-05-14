import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  console.log(isLoading, 'jjjjjjjjjjjjjjjjjjjjjjjjjjj');
  React.useEffect(() => {
    tryToLoginFirst();
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
          var user = result.user;
          var userDict = {
            id: user.uid,
            fullname: user.displayName,
            email: user.email,
            profileURL: user.photoURL,
          };
          dispatch(login(userDict));
          navigation.navigate('Home');
        })
        .catch(error => {
          setIsLoading(false);
        });
      return;
    }
    setIsLoading(false);
  }

  if (isLoading == true) {
    return (
      <ActivityIndicator style={styles.spinner} size="large" color={'white'} />
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>Welcome To My Vanam</Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '800',
    fontSize: 20,
    color: 'white',
  },
});
