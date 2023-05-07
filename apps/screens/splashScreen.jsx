import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
export default function Splash({navigation}) {
  useEffect(() => {
    console.log('heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
    setTimeout(() => {
      handleGetToken();
    }, 2000);
  });

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem('userDetails');
    if (!dataToken) {
      navigation.replace('Login');
    } else {
      navigation.replace('Home');
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'salmon',
        }}>
        {/* <Image
          source={require('../assets/image/logo.png')}
          style={{width: 300, height: 100}}
        /> */}
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
