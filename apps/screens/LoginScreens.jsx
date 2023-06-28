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
import { lock, plant1, user } from "../constants/image";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/action/AuthAction";
import { LoginDetail } from "../data/userGroupData";
import serverURL from "../helpers/serverURL";
import { Base64 } from "js-base64";

const LoginScreen = ({ navigation }) => {
  const intialState = {
    email: "",
    password: "",
  };
  const [state, setState] = React.useState(intialState);
  const { email, password } = state;
  const dispatch = useDispatch();

  const handleChange = (name) => (event) => {
    event.persist();
    setState((prev) => ({
      ...prev,
      [name]: event?.nativeEvent?.text,
    }));
  };
  const onLoginHandler = () => {
    const pwd = Base64.encode(password);
    const body = { email, password: pwd };
    dispatch(loginUser(body, navigation));
  };
  serverURL();

  return (
    <View style={styles.container}>
      <ImageBackground source={plant1} style={styles.wrapper}>
        <View style={styles.overlay} />
        <View style={styles.loginContainer}>
          <View>
            {LoginDetail.map(
              ({ leftSource, name, lable, id, passwordInput }) => {
                return (
                  <CommonInput
                    key={id}
                    leftSource={leftSource}
                    placeholder={lable}
                    passwordInput={passwordInput}
                    name={name}
                    onChange={handleChange(name)}
                    placeholderTextColor="#00000090"
                  />
                );
              }
            )}
            {/* <Text style={styles.forget}>Forget Password ?</Text> */}
            <CommonButton
              type={"lightbtn"}
              title={"Login"}
              onPress={onLoginHandler}
            />
          </View>
          {/* <View>
            <Text style={{ color: "white", marginVertical: 5, fontSize: 10 }}>
              OR
            </Text>
          </View> */}
          {/* <View style={styles.IconContainer}>
            <TouchableOpacity style={styles.iconBtn}>
              <Image source={require("../assets/image/google1.png")} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Image source={require("../assets/image/appleWhite.png")} />
            </TouchableOpacity>
          </View> */}
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

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
