import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React from "react";
import { CommonColor } from "../constants/colors";
import { userGroupData } from "../data/userGroupData";
import { RadioButton } from "react-native-paper";
import CommonButton from "../components/common/CommonButton";
import { nature } from "../constants/image";

const UserGroupScreen = ({ navigation }) => {
  const [value, setValue] = React.useState("Normal User");
  const onHandlePress = () => {
    switch (value) {
      case "Oragainzation User":
        {
          navigation.navigate("OrganizationUser", { isRegisterUser: false });
        }
        break;
      case "Register User":
        {
          navigation.navigate("RegisterUser", { isRegisterUser: true });
        }
        break;
      default:
        navigation.navigate("NormalUserLogin");
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.5, justifyContent: "center" }}>
        <Image source={nature} />
      </View>
      <View style={styles.textContainer}>
        <Text
          style={{
            color: CommonColor.primary,
            fontSize: 33,
            fontWeight: "bold",
          }}
        >
          HOW{" "}
          <Text style={{ color: "black", fontSize: 18 }}>
            {" "}
            TO CREATE YOUR ACCOUNT ?
          </Text>
        </Text>
      </View>
      <View style={styles.radioContainer}>
        <RadioButton.Group onValueChange={(va) => setValue(va)} value={value}>
          {userGroupData.map((item) => {
            return (
              <View key={item.id} style={styles.radioButton}>
                <RadioButton color={CommonColor.primary} value={item.title} />
                <Text style={styles.text}>{item.title}</Text>
              </View>
            );
          })}
        </RadioButton.Group>
        <CommonButton title={"next"} onPress={onHandlePress} type="lightbtn" />
      </View>
    </View>
  );
};

export default UserGroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonColor.secondary,
    alignItems: "center",
  },
  textContainer: {
    width: 250,
    flex: 0.1,
    justifyContent: "flex-start",
  },
  radioContainer: {
    flex: 0.3,
    width: 250,
    justifyContent: "flex-start",
    marginVertical: 15,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontWeight: "500",
  },
});
