import { useState, useEffect } from "react";
import { PermissionsAndroid } from "react-native";
import Geolocation from "@react-native-community/geolocation";

export const useGeolocation = () => {
  const [error, setError] = useState("");
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
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
            setPosition(position.coords);
          },
          (error) => {
            // See error code charts below.

            setPosition(false);
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
