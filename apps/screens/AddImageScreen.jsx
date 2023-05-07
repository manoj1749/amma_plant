import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
  ActivityIndicator,
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
  const [tags, setTags] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const [enableCamera, setEnableCamera] = React.useState(false);
  const close = () => setVisible(false);
  const open = () => setVisible(true);
  const dimention = useWindowDimensions();
  const top = useSharedValue(dimention.height);
  const [location, setLocation] = React.useState(null);
  const [error, setError] = React.useState(null);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectuploaded);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      error => {
        setError(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const style = useAnimatedStyle(() => {
    return {
      top: top.value,
    };
  });
  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context) {
      context.startTop = top.value;
    },
    onActive(e, context) {
      top.value = context.startTop + e.translationY;
    },
    onEnd() {
      if (top.value > dimention.height / 2 + 200) {
        top.value = dimention.height;
      } else {
        top.value = dimention.height / 2;
      }
    },
  });
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setUri(image.path);
        props.onChange?.(image);
      })
      .finally(close);
  };
  const chooseImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setUri(image.path);
        props.onChange?.(image);
      })
      .finally(close);
  };
  useEffect(() => {
    if (uri) {
      setEnableCamera(false);
    }
  }, [uri]);

  const onChangehandler = text => {
    setDescripton(text);
  };
  const handleUpload = () => {
    const data = {
      image:
        'https://lh3.googleusercontent.com/a/AGNmyxbdp59yCNxoZgirhbaREVh2m--g7pzwG5dYDHXlwA=s96-c',
      description: description,
      location: location,
      tag: tags,
    };
    dispatch(uploadPost(data));
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.firstContainer}>
          {uri ? (
            <ImageBackground
              source={{uri: uri}}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="cover">
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                }}
                onPress={() => setEnableCamera(!enableCamera)}>
                <Icon name={'edit'} size={30} color="white" />
              </TouchableOpacity>
            </ImageBackground>
          ) : (
            <TouchableOpacity
              onPress={() => {
                top.value = withSpring(700, _SPRING_CONFIG);
                setEnableCamera(!enableCamera);
              }}>
              <Icon name="camera" color="black" size={30} />
            </TouchableOpacity>
          )}
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
            <Tags
              textInputProps={{
                placeholder: 'type tree and click space',
              }}
              initialTags={[]}
              onChangeTags={tags => setTags(tags)}
              onTagPress={(index, tagLabel, event, deleted) =>
                console.log(
                  index,
                  tagLabel,
                  event,
                  deleted ? 'deleted' : 'not deleted',
                )
              }
              containerStyle={{
                padding: 5,
                width: 370,
                marginLeft: 5,
              }}
              inputStyle={{
                backgroundColor: 'white',
                border: '2px solid white',
                borderRadius: 20,
              }}
              renderTag={({
                tag,
                index,
                onPress,
                deleteTagOnPress,
                readonly,
              }) => (
                <TouchableOpacity
                  key={`${tag}-${index}`}
                  onPress={onPress}
                  style={{
                    padding: 7,
                    backgroundColor: 'white',
                    margin: 5,
                    borderRadius: 10,
                  }}>
                  <Text style={{color: 'salmon'}}>{tag}</Text>
                </TouchableOpacity>
              )}
            />
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
              // width: '100%',
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
              {/* <FontAwesome size={20} color="green" name="periscope" /> */}
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
      </View>
      {enableCamera && (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                top: dimention.height,
                backgroundColor: '#efe0d7',
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                shadowColor: 'black',
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
                elevation: 5,
                shadowOpacity: 0.25,
                boxShadow: ' rgba(149, 157, 165, 0.2) 0px 8px 24px',
                shadowRadius: 3.84,
              },
              style,
            ]}>
            <View
              style={{
                width: '80%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={openCamera}>
                <Icon name="camera" size={25} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={chooseImage}>
                <Icon name="image" size={25} color="black" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </PanGestureHandler>
      )}
    </>
  );
};

export default AddImage;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f4ede630'},
  firstContainer: {
    flex: 0.3,
    backgroundColor: '#dcdcdc',
    alignItems: 'center',
    justifyContent: 'center',
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
