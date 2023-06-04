import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import { USER_DATA_GET_SUCCESSFULLY } from "../actionTypes";

const getuserDataAction = (data) => {
  return {
    type: USER_DATA_GET_SUCCESSFULLY,
    payload: data,
  };
};

export const postAction = createAsyncThunk(
  "post/uploadPost",
  ({ imageUri, description, tags, longtitude, latitude }) => {
    const formData = new FormData();
    formData.append("image", {
      uri: imageUri.assets[0].uri,
      name: imageUri.assets[0].fileName,
      type: imageUri.assets[0].type,
    });
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("longtitude", longtitude);
    formData.append("latitude", latitude);
    fetch("http://192.168.183.135:4848/user/post", {
      method: "POST",
      headers: {
        // Accept: "application/json",
        "content-type": "multipart/form-data",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.statuscode === 201) {
          Toast.show({
            type: "SuccessToast",
            text1: res.message,
          });
        } else if (res.statuscode === 400) {
          Toast.show({
            type: "ErrorToast",
            text1: res.message,
          });
        } else {
          Toast.show({
            type: "ErrorToast",
            text1: res.error,
          });
        }
      })
      .catch((err) => console.log(err, "ERR"));
  }
);

export const getUserData = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `http://192.168.183.135:4848/user/getDetails?id=${id}`
      );
      const result = await response.json();
      dispatch(getuserDataAction(result.user));
    } catch (error) {
      console.log(error);
    }
  };
};
