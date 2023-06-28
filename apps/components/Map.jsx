import { StyleSheet, View, SafeAreaView } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import useLocation, {
  requestLocationPermission,
  useGeolocation,
} from "../hooks/useGeoLocation";
import retroMap from "../data/retroMap.json";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { fetchLocationName } from "../redux/action/AuthAction";
import React from "react";
import Geolocation from "react-native-geolocation-service";

const Map = ({ onLocationSelect = () => {} }) => {
  const styles = styling();
  const [state, setState] = React.useState({
    longitude: 0,
    latitude: 0,
  });
  const { latitude, longitude } = state;
  const getGeoLocaation = () => {
    const config = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
    };

    Geolocation.getCurrentPosition(
      (info) =>
        setState((prev) => ({
          ...prev,
          longitude: info.coords.longitude,
          latitude: info.coords.latitude,
        })),

      (error) => console.log("ERROR", error),
      config
    );
  };
  React.useEffect(() => {
    requestLocationPermission();
    getGeoLocaation();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={retroMap}
        showsUserLocation={true}
        maxZoomLevel={50}
        minZoomLevel={1}
        Region={{
          latitude: latitude,
          longitude: longitude,
        }}
        onPress={onLocationSelect}
      >
        {longitude !== 0 && (
          <Marker
            draggable
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            onDragEnd={(e) => console.log(e)}
          />
        )}
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
