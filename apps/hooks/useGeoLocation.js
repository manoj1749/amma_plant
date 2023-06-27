import { useState, useEffect } from "react";
import { PermissionsAndroid } from "react-native";
import Geolocation from "@react-native-community/geolocation";

export const useGeolocation = () => {
  const [error, setError] = useState("");
  const [position, setPosition] = useState({
    latitude: 9.095046666666667,
    longitude: 76.492455,
  });
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Geolocation Permission",
          message: "Can we access your location?",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );

      if (granted === "granted") {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then((res) => {
      if (res) {
        Geolocation.getCurrentPosition(
          (position) => {
            setPosition({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            // See error code charts below.

            setPosition({
              latitude: 9.095046666666667,
              longitude: 76.492455,
            });
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    });
  };
  useEffect(() => {
    getLocation();
  }, []);

  return [error, position];
};
