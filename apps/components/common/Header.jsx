import { Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { backBtnWhite, backBtnblack, menu } from "../../constants/image";

const Header = ({ name, onPressRight, onPressLeft, isBlack }) => {
  return (
    <View
      style={{
        marginLeft: 5,
        paddingHorizontal: 5,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 60,
        backgroundColor: "#F6EBE7",
        // borderBottomLeftRadius: 40,
        // borderBottomRightRadius: 40,
        shadowColor: "#C47A5E",
        elevation: 15,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={{ marginRight: 0 }} onPress={onPressLeft}>
          <Image source={isBlack ? backBtnWhite : backBtnblack} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "Poppins-Bold",
            color: "#112A46",
            marginHorizontal: 10,
          }}
        >
          {name}
        </Text>
      </View>

      <View style={{ marginRight: 15 }}>
        <TouchableOpacity
          style={{
            width: 30,
            alignItems: "center",
            justifyContent: "center",
            height: 50,
          }}
          onPress={onPressRight}
        >
          <Image source={menu} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Header;
