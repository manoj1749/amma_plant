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
      console.log("granted", granted);
      if (granted === "granted") {
        console.log("You can use Geolocation");
        return true;
      } else {
        console.log("You cannot use Geolocation");
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then((res) => {
      console.log("res is:", res);
      if (res) {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position.coords);
            setPosition(position);
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
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
