import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import { navigate } from "../../helpers/navigationService";
import {
  LOGIN_FAILED,
  LOGIN_PEDNDING,
  LOGIN_SUCCESSFULLY,
} from "../actionTypes";
import { setToken } from "../../utiltis/utilitis";
import AsyncStorage from "@react-native-async-storage/async-storage";

const serverURL = "http://123.63.2.13:3000/api";

const LoginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESSFULLY,
    payload: data,
  };
};
const loginFailed = () => {
  return {
    type: LOGIN_FAILED,
  };
};
const loginPending = () => {
  return {
    type: LOGIN_PEDNDING,
  };
};

export const registerUser = (
  {
    fullname,
    email,
    confirmPassword,
    password,
    mobile,
    image,
    role,
    selectId,
    idNumber,
  },
  navigation
) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: image.assets[0].uri,
        name: image.assets[0].fileName,
        type: image.assets[0].type,
      });
      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("mobile", mobile);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      formData.append("role", role);
      formData.append("selectId", selectId);
      formData.append("idNumber", idNumber);
      const response = await fetch("http://123.63.2.13:3000/api/signup", {
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
        },
        body: formData,
      });
      const result = await response.json();
      if (result.statuscode === 201) {
        Toast.show({
          type: "SuccessToast",
          text1: result.message,
        });
        navigation.navigate("WelcomeScreen");
        return result;
      } else if (result.statuscode === 400) {
        Toast.show({
          type: "ErrorToast",
          text1: result.message,
        });
      } else {
        Toast.show({
          type: "ErrorToast",
          text1: result.error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginUser = (data, navigation) => {
  return async (dispatch) => {
    dispatch(loginPending());
    try {
      const res = await fetch("http://123.63.2.13:3000/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.statuscode === 200) {
        Toast.show({
          type: "SuccessToast",
          text1: result.message,
        });
        dispatch(LoginSuccess(result.user));
        await AsyncStorage.setItem("token", result.user.token);
        await AsyncStorage.setItem("loginId", result.user.id);
        await AsyncStorage.setItem("isLoggedin", "true");
        navigation.navigate("DrawerStack");
      } else if (result.statuscode === 400) {
        Toast.show({
          type: "ErrorToast",
          text1: result.message,
        });
      } else {
        Toast.show({
          type: "ErrorToast",
          text1: result.error,
        });
      }
      dispatch(loginFailed());
    } catch (error) {
      console.log(error);
    }
  };
};
export const googleLogin = (idToken) => {
  return async (dispatch) => {
    try {
      console.log(idToken);
      const response = await fetch(
        "http://123.63.2.13:3000/api/google-signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: idToken,
        }
      );
      const result = await response.json();
      console.log(result);
      if (result.statuscode === 200) {
        Toast.show({
          type: "SuccessToast",
          text1: result.message,
        });
        dispatch(LoginSuccess(result.user));
        await AsyncStorage.setItem("token", result.token);
        await AsyncStorage.setItem("loginId", result.id);
        await AsyncStorage.setItem("isLoggedin", "true");
        // navigation.navigate("DrawerStack");
      } else if (result.statuscode === 400) {
        Toast.show({
          type: "ErrorToast",
          text1: result.message,
        });
      } else {
        Toast.show({
          type: "ErrorToast",
          text1: result.error,
        });
      }
      dispatch(loginFailed());
    } catch (error) {
      console.log(error);
    }
  };
};
