import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Dimensions,
} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
const ImagePickerModal = ({
  isVisible,
  onClose,
  onImageLibraryPress,
  onCameraPress,
}) => {
  return (
    <ReactNativeModal
      isVisible={isVisible}
      swipeDirection="down"
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={styles.modal}>
      <SafeAreaView style={styles.buttons}>
        <Pressable style={styles.button} onPress={onImageLibraryPress}>
          <Icon
            name="image"
            size={25}
            color="black"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Library</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onCameraPress}>
          <Icon
            name="camera"
            size={25}
            color="black"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Camera</Text>
        </Pressable>
      </SafeAreaView>
    </ReactNativeModal>
  );
};

export default ImagePickerModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  buttons: {
    backgroundColor: '#fff',
    height: Dimensions.get('screen').height / 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  button: {
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonIcon: {},
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
