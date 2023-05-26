import Geolocation from '@react-native-community/geolocation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  View,
  FlatList,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {customStyleMap} from '../styles/customStyles';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import {selectLocation, setLocation} from '../redux/slices/mapSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useGeolocation} from '../hooks/useGeoLocation';
const Map = ({navigation}) => {
  // const [location, setLocation] = React.useState(null);
  const [error, position] = useGeolocation();
  console.log(position);
  const dispatch = useDispatch();
  const {latitude, longitude} = useSelector(selectLocation);

  const handleLocationPermission = async () => {
    let permissionCheck = '';
    if (Platform.OS === 'ios') {
      permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (permissionCheck === RESULTS.DENIED) {
        const permissionRequest = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('Location perrmission denied.');
      }
    }
    if (Platform.OS === 'android') {
      permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (permissionCheck === RESULTS.DENIED) {
        const permissionRequest = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('Location perrmission denied.');
      }
    }
  };
  React.useEffect(() => {
    handleLocationPermission();
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          listViewDisplayed={false}
          // textInputProps={{
          //   onBlur,
          // }}
          query={{
            key: 'AIzaSyAWJUXGFC1TthkJavWWaxKC_FkjgoJlUiI',
            language: 'en',
            types: 'address',
          }}
          debounce={200}
          onFail={error => console.log(error)}
          onNotFound={() => console.log('no results')}
          listEmptyComponent={() => (
            <View style={{flex: 1, padding: 10}}>
              <Text style={{color: 'salmon'}}>No results were found</Text>
            </View>
          )}
          styles={{
            textInputContainer: {
              backgroundColor: '#86adae',
              // position: 'absolute',
            },
            textInput: {
              height: 58,
              color: 'salmon',
              fontSize: 19,
              borderRadius: 30,
              paddingLeft: 30,
              marginTop: 5,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
        />
        <MapView
          style={styles.map}
          // provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={e => console.log('EE', e.nativeEvent.coordinate)}
          showsUserLocation={true}
          // customMapStyle={customStyleMap}
          // paddingAdjustmentBehavior="automatic"
          // showsMyLocationButton={true}
          // showsBuildings={true}
          // followsUserLocation={true}
          // showsCompass={true}
          // scrollEnabled={true}
          // zoomEnabled={true}
          // pitchEnabled={true}
          // rotateEnabled={true}
          // loadingEnabled={true}
          // loadingIndicatorColor="#fcb103"
          loadingBackgroundColor="#242f3e">
          <Marker coordinate={{latitude, longitude}} />
        </MapView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ee6e73',
    position: 'absolute',
    bottom: 0,
    right: 10,
  },
});
export default Map;
