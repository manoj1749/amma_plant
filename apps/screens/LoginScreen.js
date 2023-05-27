import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Button, TextInput } from "react-native-paper";
import Icon, { Icons } from "../constants/Icons";
const intialState = () => {
  return {
    hidePassword: true,
  };
};
const LoginScreen = () => {
  const [state, setState] = React.useState(intialState());
  const { hidePassword } = state;
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/image/logoMini.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.loginForm}>
        <TextInput
          style={styles.input}
          activeUnderlineColor="#ffffff"
          underlineColor="#ffffff"
          placeholder="Email"
          left={
            <TextInput.Icon
              icon={() => <Icon type={Icons.Feather} name={"home"} size={20} />}
            />
          }
        />
        <TextInput
          style={styles.input}
          activeUnderlineColor="#ffffff"
          underlineColor="#ffffff"
          placeholder="password"
          left={
            <TextInput.Icon
              icon={() => <Icon type={Icons.Feather} name={"lock"} size={20} />}
            />
          }
          right={
            <TextInput.Icon
              icon={() => (
                <TouchableOpacity
                  onPress={() =>
                    setState((prev) => ({
                      ...prev,
                      hidePassword: !hidePassword,
                    }))
                  }
                >
                  {hidePassword ? (
                    <Icon type={Icons.Feather} name={"eye"} eye-off size={15} />
                  ) : (
                    <Icon
                      type={Icons.Feather}
                      name={"eye-off"}
                      eye-off
                      size={15}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          }
          secureTextEntry={hidePassword}
        />
        <View>
          <Text style={styles.recovery}>Recovery Password</Text>
          <Button textColor="black" style={styles.button}>
            Login
          </Button>
        </View>
      </View>
      {/* <View style={styles.dividerContainer}>
        <Text style={styles.divider}>Or continue with</Text>
      </View> */}
      <View style={styles.socicalLogin}>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            style={styles.icon}
            source={require("../assets/icons/google.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            style={styles.icon}
            source={require("../assets/icons/apple.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            style={styles.icon}
            source={require("../assets/icons/facebook.png")}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "40%",
    height: "60%",
  },
  loginForm: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 350,
    backgroundColor: "white",
    marginVertical: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    color: "black",
    fontWeight: "bold",
    borderWidth: 0.1,
    borderColor: "grey",
  },
  button: {
    backgroundColor: "salmon",
    width: 300,
    marginVertical: 15,
    fontWeight: "bold",
  },
  dividerContainer: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    textAlign: "center",
  },
  socicalLogin: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  recovery: {
    fontSize: 12,
  },
  iconButton: {
    height: 50,
    width: 60,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "grey",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
