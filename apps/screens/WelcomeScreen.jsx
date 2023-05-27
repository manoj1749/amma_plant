import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import React from "react";
import auth from "@react-native-firebase/auth";
import firebase from "@react-native-firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import CommonButton from "../components/common/CommonButton";

const WelcomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  // console.log(isLoading, 'jjjjjjjjjjjjjjjjjjjjjjjjjjj');
  // React.useEffect(() => {
  //   tryToLoginFirst();
  // }, []);
  // async function tryToLoginFirst() {
  //   const id = await AsyncStorage.getItem('@loggedInUserID:id');
  //   const googleToken = await AsyncStorage.getItem(
  //     '@loggedInUserID:googleCredentialAccessToken',
  //   );
  //   if (
  //     id != null &&
  //     id.length > 0 &&
  //     googleToken != null &&
  //     googleToken.length > 0
  //   ) {
  //     const credential =
  //       firebase.auth.GoogleAuthProvider.credential(googleToken);
  //     auth()
  //       .signInWithCredential(credential)
  //       .then(result => {
  //         var user = result.user;
  //         var userDict = {
  //           id: user.uid,
  //           fullname: user.displayName,
  //           email: user.email,
  //           profileURL: user.photoURL,
  //         };
  //         dispatch(login(userDict));
  //         navigation.navigate('Home');
  //       })
  //       .catch(error => {
  //         setIsLoading(false);
  //       });
  //     return;
  //   }
  //   setIsLoading(false);
  // }

  // if (isLoading == true) {
  //   return (
  //     <ActivityIndicator style={styles.spinner} size="large" color={'white'} />
  //   );
  // }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/image/plant.jpg")}
        style={styles.wrapper}
      >
        <View style={styles.overlay} />
        <View style={styles.ButtonContainer}>
          <CommonButton
            title="Create an Account"
            onPress={() => navigation.navigate("UserGroup")}
          />
          <CommonButton
            type="lightbtn"
            title="Login"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    // position:'relative',
    justifyContent: "flex-end",
    alignItems: "center",
  },
  overlay: {
    width: "100%",
    backgroundColor:
      "linear-gradient(180deg, rgba(0, 0, 0, 0.0996369) 16.67%, rgba(245, 245, 245, 0.10) 55.21%, rgba(0, 0, 0, 0.10) 65.62%, rgba(0, 0, 0, 0.1989583) 99.99%, rgba(0, 0, 0, 0.5) 100%)",
    height: "100%",
    position: "absolute",
  },
  ButtonContainer: {
    flex: 0.5,
    justifyContent: "center",
  },
  text: {
    fontWeight: "800",
    fontSize: 20,
    color: "white",
  },
  Button: {
    backgroundColor: "yellow",
    width: 200,
    marginBottom: 30,
  },
});
