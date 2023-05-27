import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./RootNavigator";
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
        visibilityTime={2000}
      />
    </>
  );
};

export default AppNavigator;
