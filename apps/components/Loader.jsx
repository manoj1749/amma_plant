import {View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Loader = () => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LottieView
        source={require('../assets/image/loading.json')}
        autoPlay
        loop
        style={{width: '80%'}}
      />
    </View>
  );
};

export default Loader;
