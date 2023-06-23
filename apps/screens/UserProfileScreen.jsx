import { Button, View, Text } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { userProfileDetails } from "../data/userGroupData";
import CommonButton from "../components/common/CommonButton";
import CommonInput from "../components/common/commonInput";
import { avatarBoy } from "../constants/image";

import { getLoginId } from "../utiltis/utilitis";
import { getImageByid, getUserData } from "../redux/action/PostAction";
import serverURL from "../helpers/serverURL";

import Component from "../components/common/card/card";
import CommonModal from "../components/common/commonModal";
const UserProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state) => state.post);
  const [state, setState] = React.useState({
    enableCards: false,
  });
  const { enableCards } = state;

  React.useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      getLoginId().then((res) => {
        console.log(res, "auhhh");
        dispatch(getUserData(res));
        dispatch(getImageByid(res));
      });
    });
    focusHandler;
  }, [navigation]);
  const onHandlePress = (title) => {
    if (title === "My Plant") {
      setState((prev) => ({
        ...prev,
        enableCards: true,
      }));
    }
  };
  const onClose = (title) => {
    setState((prev) => ({
      ...prev,
      enableCards: false,
    }));
  };
  console.log(`${serverURL()}/${userDetail?.profilePicture}`);
  return (
    <>
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
                    uri: `${serverURL()}/${userDetail?.profilePicture}`,
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
                onPress={() => onHandlePress(title)}
              />
            );
          })}
        </View>
      </View>
      {enableCards && (
        <CommonModal
          isVisible={enableCards}
          onClose={onClose}
          children={<Component />}
        />
      )}
    </>
  );
};

export default UserProfile;
