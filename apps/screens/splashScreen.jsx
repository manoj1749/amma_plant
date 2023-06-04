import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { View, Animated, Image, StyleSheet, Text } from "react-native";
import { getToken } from "../utiltis/utilitis";

const SplashScreen = ({ navigation }) => {
  console.log("splash");
  useEffect(() => {
    console.log("splash2");
    const timer = setTimeout(async () => {
      checkUserIsLoggedIn();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const checkUserIsLoggedIn = async () => {
    const isLoggedIn = await getToken("token");
    console.log("splash2-isLoggedIndhoni", isLoggedIn);

    if (isLoggedIn) {
      navigation.navigate("DrawerStack");
    } else {
      navigation.navigate("WelcomeScreen");
    }
  };
  return (
    <View style={styles.container}>
      <Animated.View>
        <LottieView
          source={require("../assets/image/splash.json")}
          autoPlay
          loop
          style={{ width: "80%" }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
