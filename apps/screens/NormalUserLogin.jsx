import { StyleSheet, View, ImageBackground } from "react-native";
import React from "react";
import { plant1 } from "../constants/image";
import { CommonColor } from "../constants/colors";
import CommonButton from "../components/common/CommonButton";
import { NormalUser } from "../data/userGroupData";

const NormalUserLogin = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={plant1} style={styles.wrapper}>
        <View style={styles.overlay} />
        <View>
          {NormalUser.map(({ id, title, leftSource }) => {
            return (
              <CommonButton
                key={id}
                type={"lightbtn"}
                leftSource={leftSource}
                title={title}
              />
            );
          })}
        </View>
      </ImageBackground>
    </View>
  );
};

export default NormalUserLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    // position:'relative',
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    width: "100%",
    backgroundColor:
      "linear-gradient(180deg, rgba(0, 0, 0, 0.0996369) 16.67%, rgba(245, 245, 245, 0.10) 55.21%, rgba(0, 0, 0, 0.10) 65.62%, rgba(0, 0, 0, 0.1989583) 99.99%, rgba(0, 0, 0, 0.5) 100%)",
    height: "100%",
    position: "absolute",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: CommonColor.textColorLight,
    marginHorizontal: 10,
  },
});
