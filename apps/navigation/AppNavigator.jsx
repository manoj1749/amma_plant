import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import RootNavigator from "./RootNavigator";
import AuthNavigator from "./AuthNavigator";
import Loader from "../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { toastConfig } from "../helpers/toastConfiq";

const AppNavigator = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <Toast
        config={toastConfig}
        position="top"
        bottomOffset={5}
        visibilityTime={3000}
      />
    </>
  );
};

export default AppNavigator;
