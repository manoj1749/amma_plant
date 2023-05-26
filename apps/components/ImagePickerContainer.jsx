import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

const ImagePickerContainer = ({uri, onPress}) => {
  return (
    <>
      {uri ? (
        <ImageBackground
          source={{uri}}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={onPress}>
            <Icon name="edit" color="black" size={30} />
          </TouchableOpacity>
        </ImageBackground>
      ) : (
        <View style={styles.Container}>
          <Pressable style={styles.subContainer} onPress={onPress}>
            <Icon name="upload" size={50} color="black" />
            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <Text style={{fontWeight: '800', color: 'black'}}>
                Choose a image{' '}
              </Text>
              <Text style={{fontWeight: '600'}}>or Capture a Photo</Text>
            </View>
          </Pressable>
        </View>
      )}
    </>
  );
};

export default ImagePickerContainer;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    width: '90%',
  },
  subContainer: {
    // backgroundColor: 'red',
    width: '98%',
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    border: '1px dotted black',
    borderStyle: 'dotted',
    borderColor: 'orange',
  },
});
