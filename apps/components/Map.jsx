import { StyleSheet, View, SafeAreaView } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useGeolocation } from "../hooks/useGeoLocation";
import retroMap from "../data/retroMap.json";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { fetchLocationName } from "../redux/action/AuthAction";

const Map = ({ onLocationSelect = () => {} }) => {
  const [error, position] = useGeolocation();
  const styles = styling();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={retroMap}
        showsUserLocation={true}
        maxZoomLevel={50}
        minZoomLevel={1}
        Region={position}
        onPress={onLocationSelect}
      >
        <Marker
          draggable
          coordinate={position}
          onDragEnd={(e) => console.log(e)}
        />
      </MapView>
    </SafeAreaView>
  );
};
export default Map;
const styling = () =>
  StyleSheet.create({
    map: {
      width: "100%",
      height: "100%",
    },
  });
