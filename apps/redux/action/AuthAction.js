import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import { navigate } from "../../helpers/navigationService";
import {
  LOGIN_FAILED,
  LOGIN_PEDNDING,
  LOGIN_SUCCESSFULLY,
  PENDING_LOCATION,
  UPDATE_LONG_LAT,
} from "../actionTypes";
import { setToken } from "../../utiltis/utilitis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import serverURL from "../../helpers/serverURL";

console.log(serverURL());

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
const updateLatAndLong = (data) => {
  return {
    type: UPDATE_LONG_LAT,
    payload: data,
  };
};
const pendingLocation = () => {
  return {
    type: PENDING_LOCATION,
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
  console.log("passsssss", password, confirmPassword);
  return async (dispatch) => {
    if (!image) {
      Toast.show({
        type: "ErrorToast",
        text1: "Please select profile picture",
      });
      return;
    }
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
      console.log(serverURL, "hello");
      const response = await fetch(`${serverURL()}/api/signup`, {
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
  console.log(serverURL());
  return async (dispatch) => {
    dispatch(loginPending());
    try {
      const res = await fetch(`${serverURL()}/api/signin`, {
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
      const response = await fetch(`${serverURL()}/api/google-signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: idToken,
      });
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

export const fetchLocationName = (lat, long) => {
  return async (dispatch) => {
    dispatch(pendingLocation());
    await fetch(
      `https://www.mapquestapi.com/geocoding/v1/reverse?key=ee8a3vrSXiTtex2n4cjEVJAjet2Sxjw4&location=${lat}%2C${long}&outFormat=json&thumbMaps=true`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson", responseJson);
        const [res] = responseJson.results
          .map((item) => {
            return item.locations;
          })
          .map((item1) => item1[0]);
        const [latAndLong] = responseJson.results
          .map((item) => {
            return item.providedLocation;
          })
          .map((item1) => item1["latLng"]);
        console.log(latAndLong);
        dispatch(updateLatAndLong(latAndLong));

        if ([res].length > 0) {
          Toast.show({
            type: "SuccessToast",
            text1: `location set successfully`,
          });
        }
      });
  };
};
