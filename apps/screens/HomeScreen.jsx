import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Map from "../components/Map";
import Geolocation from "@react-native-community/geolocation";
import { getLoginId, getToken } from "../utiltis/utilitis";
import { getUserData } from "../redux/action/PostAction";
import { getGeolocation } from "../redux/action/AuthAction";

// import { setLocation } from "../redux/slices/mapSlice";

const HomePage = ({ navigation }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    getLoginId().then((res) => {
      console.log(res, "auhhh");
      dispatch(getUserData(res));
    });
  }, []);
  return (
    <View style={styles.container}>
      <Map />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: { flex: 1 },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#86adae",
    position: "absolute",
    bottom: 20,
    right: 10,
    padding: 2,
    color: "white",
  },
});
export default HomePage;
