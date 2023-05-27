import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MenuButton from "../../components/MenuButton";
import { AppIcon } from "../../styles/AppStyles";
import { useDispatch } from "react-redux";
import { Avatar } from "react-native-paper";
import Icon, { Icons } from "../../constants/Icons";
import { addBlack, avatarBoy, home, logout } from "../../constants/image";
import { Image } from "react-native-animatable";

export default function DrawerContainer({ navigation }) {
  const dispatch = useDispatch();
  const DrawerArr = [
    { route: "HomeStack", Title: "Home", Name: "home", leftSource: home },
    {
      route: "AddImageStack",
      Title: "Add Image",
      Name: "add-a-photo",
      leftSource: addBlack,
    },
    {
      route: "LoginStack",
      Title: "Log Out",
      Name: "logout",
      leftSource: logout,
    },
  ];
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
                onPress={() => navigation.navigate(item.route)}
              >
                <Image source={item.leftSource} />
                <Text style={{ marginLeft: 10 }}>{item.Title}</Text>
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
