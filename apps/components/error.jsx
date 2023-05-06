import {View, Text} from 'react-native';
import React from 'react';

const Error = ({message}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'salmon',
        }}>
        <Image
          source={require('../assets/image/logo.png')}
          style={{width: 300, height: 100}}
        />
        <Text>{message}</Text>
      </View>
    </View>
  );
};

export default Error;
