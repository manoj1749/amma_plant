import {View} from 'react-native';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {Marker} from 'react-native-maps';
const MapScreen = () => {
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const onLocationSelect = (data, details) => {
    setSelectedLocation({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
  };

  return (
    <View style={styles.container}>
      {/* <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={onLocationSelect}
        fetchDetails={true}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en',
          types: 'address',
        }}
      /> */}
      <MapView style={styles.map} initialRegion={initialRegion}>
        {selectedLocation && (
          <Marker coordinate={selectedLocation} title="Selected Location" />
        )}
      </MapView>
    </View>
  );
};
export default MapScreen;
