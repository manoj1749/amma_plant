import { View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Avatar, Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUser,
  selectUser,
  selectUsersDetails,
  signoutAction,
} from "../redux/slices/userSlice";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Icon from "react-native-vector-icons/AntDesign";
import auth, { firebase } from "@react-native-firebase/auth";
import { getTokenId, getUserDetails, removeTokenId } from "../utiltis/utilitis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auther from "@react-native-firebase/auth";
import { userProfileDetails } from "../data/userGroupData";
import CommonButton from "../components/common/CommonButton";
import CommonInput from "../components/common/commonInput";
import { avatarBoy } from "../constants/image";

const UserProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUsersDetails);
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       '814407182169-57gk9a8i2plth612gk3ont22fbt3emmu.apps.googleusercontent.com',
  //     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  //     // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  //     // iosClientId: '', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  //   });
  //   signOut();
  // }, []);

  const signOut = () => {
    // getUserDetails().then(res => {
    //   console.log('idToken', res.token);
    //   dispatch(signoutAction());
    // });
    // dispatch(signoutAction());
    auther()
      .signOut()
      .then(() => {
        AsyncStorage.removeItem("@loggedInUserID:id");
        navigation.navigate("Login");
      });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View
        style={{
          flex: 0.2,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 30,
        }}
      >
        <Avatar.Image
          size={150}
          style={{
            marginHorizontal: 20,
            backgroundColor: "white",
            elevation: 10,
            shadowColor: "#00000050",
          }}
          source={avatarBoy}
        />
      </View>
      <View
        style={{
          flex: 0.2,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          paddingBottom: 20,
        }}
      >
        <CommonInput
          name={"fullName"}
          placeholder={"Full Name"}
          isEditable={false}
        />
      </View>
      <View
        style={{
          flex: 0.3,
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {userProfileDetails.map(({ id, title, leftSource }) => {
          return (
            <CommonButton
              key={id}
              title={title}
              leftSource={leftSource}
              type={"lightbtn"}
              size={"small"}
            />
          );
        })}
      </View>
    </View>
  );
};

export default UserProfile;
