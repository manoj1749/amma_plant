import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import MenuButton from "../../components/MenuButton";
import { AppIcon } from "../../styles/AppStyles";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "react-native-paper";
import Icon, { Icons } from "../../constants/Icons";
import { addBlack, avatarBoy, home, logout } from "../../constants/image";
import { Image } from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import serverURL from "../../helpers/serverURL";
export default function DrawerContainer({ navigation }) {
  const { userDetail } = useSelector((state) => state.post);

  const DrawerArr = [
    { route: "HomeStack", Title: "Home", Name: "home", leftSource: home },
    {
      route: "AddImageStack",
      Title: "Add Image",
      Name: "add-a-photo",
      leftSource: addBlack,
    },
    {
      route: "WelcomeScreen",
      Title: "Log Out",
      Name: "logout",
      leftSource: logout,
    },
  ];
  const onhandleClick = async (route) => {
    await AsyncStorage.removeItem("token");
    navigation.navigate(route);
  };
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <View
          style={{
            flex: 0.3,
            alignItems: "center",
            justifyContent: "flex-end",
            padding: 10,
          }}
        >
          <Pressable onPress={() => onhandleClick("UserProfileStack")}>
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
          </Pressable>
        </View>
        <View
          style={{
            flex: 0.4,
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            paddingLeft: 20,
          }}
        >
          {DrawerArr.map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "100%",
                  padding: 10,
                }}
                onPress={() => onhandleClick(item.route)}
              >
                <Image source={item.leftSource} />
                <Text style={{ marginLeft: 10, color: "#00000061" }}>
                  {item.Title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
