import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  PermissionsAndroid,
  ImageBackground,
  TextInput,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import ImagePicker from 'react-native-image-crop-picker';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {selectLocation} from '../redux/slices/mapSlice';
import Geolocation from '@react-native-community/geolocation';
import {useGeolocation} from '../hooks/useGeoLocation';
import Tags from 'react-native-tags';

import {
  selectLoading,
  selectuploaded,
  uploadPost,
} from '../redux/slices/userSlice';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import ImagePickerContainer from '../components/ImagePickerContainer';
import ImagePickerModal from '../components/ImagePickerModal';
import Toast from 'react-native-toast-message';
import {WithContext as ReactTags} from 'react-tag-input';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Loader from '../components/Loader';

const _SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};
const AddImage = ({navigation}) => {
  const [uri, setUri] = React.useState(undefined);
  const [description, setDescripton] = React.useState('');
  const [isLiveLocation, setIsLiveLocation] = React.useState(true);
  const [tags, setTags] = React.useState();
  const [visible, setVisible] = React.useState(false);
  const [enableCamera, setEnableCamera] = React.useState(false);
  const close = () => setVisible(false);
  const open = () => setVisible(true);
  const dimention = useWindowDimensions();
  const top = useSharedValue(dimention.height);
  const [location, setLocation] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [pickerResponse, setPickerResponse] = React.useState(null);
  const [Done, setDone] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
        Toast.show({
          type: 'success',
          text1: 'Live Location captured',
        });
      },
      error => {
        setError(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const onChangehandler = text => {
    setDescripton(text);
  };
  async function uploadImageAndGetUrl(localFilePath) {
    const reference = storage().ref('images/' + Date.now().toString());
    await reference.putFile(localFilePath);
    const downloadURL = await reference.getDownloadURL();
    return downloadURL;
  }
  async function storeImageData(description, location, imageUrl) {
    setLoading(true);
    const data = {
      description,
      location,
      imageUrl,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    await firestore()
      .collection('posts')
      .add(data)
      .then(res => setLoading(false));
  }
  const handleUpload = async () => {
    const imageUrl = await uploadImageAndGetUrl(pickerResponse);

    await storeImageData('Image description', 'Image location', imageUrl);
  };
  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };
  const onImageLibraryPress = async () => {
    const response = await launchImageLibrary(options);
    setPickerResponse(response.assets[0].uri);
    setVisible(false);
  };
  const onCameraPress = async () => {
    let optionss = {
      saveToPhotos: true,
      mediaType: 'photo',
    };
    const response = await launchCamera(optionss);
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      setPickerResponse(response.assets[0].uri);
      setVisible(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <KeyboardAvoidingView style={styles.container}>
          <ImagePickerModal
            isVisible={visible}
            onClose={() => setVisible(false)}
            onCameraPress={onCameraPress}
            onImageLibraryPress={onImageLibraryPress}
          />
          <View style={styles.firstContainer}>
            <ImagePickerContainer
              uri={pickerResponse}
              onPress={() => setVisible(true)}
            />
          </View>
          <View
            style={{
              flex: 0.3,
              alignItems: 'center',
              marginTop: 30,
              height: 'auto',
            }}>
            <View style={{width: '100%'}}>
              <Text
                style={{
                  margin: 5,
                  paddingLeft: 10,
                  color: 'salmon',
                  fontWeight: 700,
                  fontSize: 15,
                }}>
                Description
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangehandler}
                value={description}
                keyboardType="default"
              />
            </View>
            <View style={{width: '100%'}}>
              <Text
                style={{
                  margin: 5,
                  paddingLeft: 10,
                  color: 'salmon',
                  fontWeight: 700,
                  fontSize: 15,
                }}>
                Tags
              </Text>
              {/* <ReactTags tags={tags} /> */}
            </View>
          </View>
          <View
            style={{
              flex: 0.4,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 50,
            }}>
            <View
              style={{
                display: 'flex',

                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Button
                style={{
                  width: 150,
                  marginVertical: 10,
                  borderColor: '#DCDCDC',
                  backgroundColor: '#dcdcdc',
                }}
                textColor="#5e4036"
                mode="outlined"
                icon={'earth'}
                onPress={getLocation}>
                Live Location
              </Button>
              <Text style={{marginHorizontal: 15}}> or </Text>
              <TouchableOpacity>
                <Button
                  style={{
                    width: 150,
                    marginVertical: 10,
                    borderColor: '#DCDCDC',
                    backgroundColor: '#dcdcdc',
                  }}
                  textColor="#5e4036"
                  mode="outlined"
                  icon={'earth'}
                  onPress={() => navigation.navigate('Home')}>
                  Find Location
                </Button>
              </TouchableOpacity>
            </View>

            <Button
              style={{
                width: 350,
                marginVertical: 10,
                borderColor: '#86adae',
                backgroundColor: 'salmon',
                padding: 5,
              }}
              mode="outlined"
              textColor="white"
              onPress={handleUpload}
              icon={'image'}>
              Upload Image
            </Button>
          </View>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default AddImage;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', marginTop: 10},
  firstContainer: {
    flex: 0.3,
    backgroundColor: '#86adae',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  input: {
    margin: 12,
    borderWidth: 0,
    width: 370,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    color: 'black',
  },
});
