import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CommonInput from "../components/common/commonInput";
import CommonButton from "../components/common/CommonButton";
import { CommonColor } from "../constants/colors";
import { Divider } from "react-native-paper";
import { lock, user } from "../constants/image";

const LoginScreens = () => {
  const [hide, setHide] = React.useState(false);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/image/plant.jpg")}
        style={styles.wrapper}
      >
        <View style={styles.overlay} />
        <View style={styles.loginContainer}>
          <View>
            <CommonInput leftSource={user} placeholder="email" />
            <CommonInput
              leftSource={lock}
              placeholder="password"
              passwordInput
              rightSideText
              onPress={() => setHide(!hide)}
              hide={hide}
            />
            <Text style={styles.forget}>Forget Password ?</Text>
            <CommonButton type={"lightbtn"} title={"Login"} />
          </View>
          <View>
            <Text style={{ color: "white", marginVertical: 5, fontSize: 10 }}>
              OR
            </Text>
          </View>
          <View style={styles.IconContainer}>
            <TouchableOpacity style={styles.iconBtn}>
              <Image source={require("../assets/image/google1.png")} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Image source={require("../assets/image/appleWhite.png")} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreens;

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
  forget: {
    color: CommonColor.textColorLight,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  overlay: {
    width: "100%",
    backgroundColor:
      "linear-gradient(180deg, rgba(0, 0, 0, 0.0996369) 16.67%, rgba(245, 245, 245, 0.10) 55.21%, rgba(0, 0, 0, 0.10) 65.62%, rgba(0, 0, 0, 0.1989583) 99.99%, rgba(0, 0, 0, 0.5) 100%)",
    height: "100%",
    position: "absolute",
  },
  loginContainer: {
    width: "100%",
    height: "50%",
    alignItems: "center",
    // justifyContent: "",
  },
  IconContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  iconBtn: {
    borderWidth: 1,
    width: 55,
    height: 40,
    borderRadius: 30,
    marginHorizontal: 10,
    borderColor: CommonColor.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
