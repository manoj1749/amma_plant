import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import {
  IMAGE_UPLOADING_FAILED,
  IMAGE_UPLOADING_PENDING,
  IMAGE_UPLOADING_SUCCESSFULLY,
  USER_DATA_GET_SUCCESSFULLY,
  USER_IMAGE_GET_SUCCESSFULLY,
} from "../actionTypes";
import serverURL from "../../helpers/serverURL";

const getuserDataAction = (data) => {
  return {
    type: USER_DATA_GET_SUCCESSFULLY,
    payload: data,
  };
};
const getuserImagesAction = (data) => {
  return {
    type: USER_IMAGE_GET_SUCCESSFULLY,
    payload: data,
  };
};
const uploadAssestsAction = () => {
  return {
    type: IMAGE_UPLOADING_SUCCESSFULLY,
  };
};
const uploadPendingAction = () => {
  return {
    type: IMAGE_UPLOADING_PENDING,
  };
};
const uploadFailedAction = () => {
  return {
    type: IMAGE_UPLOADING_FAILED,
  };
};
export const postAction = ({
  imageUri,
  description,
  tags,
  longtitude,
  latitude,
  id,
}) => {
  console.log(longtitude, latitude);
  return async (dispatch) => {
    try {
      if (!imageUri) {
        Toast.show({
          type: "ErrorToast",
          text1: "Please select image",
        });
        return;
      }
      if (!longtitude && !latitude) {
        Toast.show({
          type: "ErrorToast",
          text1: "Please select location",
        });
        return;
      }
      dispatch(uploadPendingAction());
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
      formData.append("id", id);
      const response = await fetch(`${serverURL()}/user/post`, {
        method: "POST",
        headers: {
          Accept: "application/json",
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
        dispatch(uploadAssestsAction());
        return result;
      } else if (result.statuscode === 400) {
        dispatch(uploadFailedAction());
        Toast.show({
          type: "ErrorToast",
          text1: result.message,
        });
      } else {
        dispatch(uploadFailedAction());
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
// export const postAction = createAsyncThunk(
//   "post/uploadPost",
//   ({ imageUri, description, tags, longtitude, latitude }) => {
//     const formData = new FormData();
//     formData.append("image", {
//       uri: imageUri.assets[0].uri,
//       name: imageUri.assets[0].fileName,
//       type: imageUri.assets[0].type,
//     });
//     formData.append("description", description);
//     formData.append("tags", tags);
//     formData.append("longtitude", longtitude);
//     formData.append("latitude", latitude);
//     fetch("http://192.168.183.135:4848/user/post", {
//       method: "POST",
//       headers: {
//         // Accept: "application/json",
//         "content-type": "multipart/form-data",
//       },
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         if (res.statuscode === 201) {
//           Toast.show({
//             type: "SuccessToast",
//             text1: res.message,
//           });
//         } else if (res.statuscode === 400) {
//           Toast.show({
//             type: "ErrorToast",
//             text1: res.message,
//           });
//         } else {
//           Toast.show({
//             type: "ErrorToast",
//             text1: res.error,
//           });
//         }
//       })
//       .catch((err) => console.log(err, "ERR"));
//   }
// );

export const getUserData = (id) => {
  console.log(id);
  return async (dispatch) => {
    try {
      const response = await fetch(`${serverURL()}/user/getDetails?id=${id}`);
      const result = await response.json();
      dispatch(getuserDataAction(result.user));
    } catch (error) {
      console.log(error);
    }
  };
};
export const getImageByid = (id) => {
  console.log(id);
  return async (dispatch) => {
    try {
      const response = await fetch(`${serverURL()}/user/getImages?id=${id}`);
      const result = await response.json();
      dispatch(getuserImagesAction(result.user));
    } catch (error) {
      console.log(error);
    }
  };
};
