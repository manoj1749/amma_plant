import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useGeolocation } from "../hooks/useGeoLocation";
import retroMap from "../data/retroMap.json";

const Map = () => {
  const [error, position] = useGeolocation();
  console.log("position", position);
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      customMapStyle={retroMap}
      showsUserLocation={true}
      maxZoomLevel={10}
      minZoomLevel={2}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {/* <Marker /> */}
    </MapView>
  );
};
export default Map;
const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
