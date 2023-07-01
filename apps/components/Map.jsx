import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useGeolocation } from "../hooks/useGeoLocation";
import retroMap from "../data/retroMap.json";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const Map = ({ hideAutoComplete }) => {
  const [error, position] = useGeolocation();
  const styles = styling(hideAutoComplete);
  return (
    <View style={{ flex: 1 }}>
      {hideAutoComplete && (
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2}
          // onPress={onLocationSelect}
          fetchDetails={true}
          query={{
            key: "AIzaSyDNPFfc-WE6epEVrT-bpXKRsTSrvW_ixLo",
            language: "en",
            types: "address",
          }}
          debounce={5000}
          nearbyPlacesAPI="GooglePlaceSearch"
          listViewDisplayed={true}
        />
      )}

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={retroMap}
        showsUserLocation={true}
        maxZoomLevel={50}
        minZoomLevel={1}
        Region={position}
      ></MapView>
    </View>
  );
};
export default Map;
const styling = (hideAutoComplete) =>
  StyleSheet.create({
    map: {
      width: "100%",
      height: hideAutoComplete ? "94%" : "100%",
    },
  });
