import { View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Avatar, Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userProfileDetails } from "../data/userGroupData";
import CommonButton from "../components/common/CommonButton";
import CommonInput from "../components/common/commonInput";
import { avatarBoy } from "../constants/image";
import { arrayBufferToBase64 } from "../helpers/arrayBufferToBase64";
import { getLoginId } from "../utiltis/utilitis";
import { getUserData } from "../redux/action/PostAction";
import serverURL from "../helpers/serverURL";

const UserProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state) => state.post);
  console.log(userDetail);
  React.useEffect(() => {
    getLoginId().then((res) => {
      console.log(res, "auhhh");
      dispatch(getUserData(res));
    });
  }, []);
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
          source={
            userDetail
              ? {
                  uri: `${serverURL}/${userDetail?.profilePicture}`,
                }
              : avatarBoy
          }
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
          value={userDetail?.fullname || "Full Name"}
          placeholderTextColor="#00000090"
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
