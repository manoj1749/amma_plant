import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Icon, { Icons } from "../../constants/Icons";
import Colors from "../../constants/colors";
import * as Animatable from "react-native-animatable";
import AddImage from "../../screens/AddImageScreen";
import Splash from "../../screens/splashScreen";
import UserProfile from "../../screens/UserProfileScreen";
import homeScreen from "../../screens/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "../common/Header";
import { backBtnWhite, backBtnblack } from "../../constants/image";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Headers = ({ onPress, isBlack }) => {
  <View>
    <TouchableOpacity
      style={{ marginRight: 15 }}
      onPress={() => navigation.openDrawer()}
    >
      <Image source={isBlack ? backBtnWhite : backBtnblack} />
    </TouchableOpacity>
  </View>;
};
const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={homeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
const AddImageStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="addImage"
        component={AddImage}
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header
              name="Add Image"
              onPressRight={() => navigation.openDrawer()}
              onPressLeft={() => navigation.navigate("Home")}
            />
          ),
          headerStyle: styles.headerStyle,
        })}
      />
    </Stack.Navigator>
  );
};
const UserProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Profile"
        component={UserProfile}
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header
              name="Add Image"
              onPressRight={() => navigation.openDrawer()}
              onPressLeft={() => navigation.navigate("Home")}
            />
          ),
          headerStyle: styles.headerStyle,
        })}
      />
    </Stack.Navigator>
  );
};
const TabArr = [
  {
    route: "HomeStack",
    label: "Home",
    type: Icons.Ionicons,
    activeIcon: "grid",
    inActiveIcon: "grid-outline",
    component: HomeStack,
  },
  {
    route: "AddImageStack",
    label: "Like",
    type: Icons.MaterialIcons,
    activeIcon: "add-a-photo",
    inActiveIcon: "add",
    component: AddImageStack,
  },
  {
    route: "UserProfileStack",
    label: "Account",
    type: Icons.FontAwesome,
    activeIcon: "user-circle",
    inActiveIcon: "user-circle-o",
    component: UserProfileStack,
  },
];
const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: { scale: 0.5, rotate: "0deg" },
        1: { scale: 1.5, rotate: "360deg" },
      });
    } else {
      viewRef.current.animate({
        0: { scale: 1.5, rotate: "360deg" },
        1: { scale: 1, rotate: "0deg" },
      });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}
    >
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <Icon
          type={item.type}
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={focused ? Colors.primary : Colors.primaryLite}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: "absolute",
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
        },
      }}
    >
      {TabArr.map((item, index) => {
        console.log(item);
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerStyle: {
    height: 60,
    backgroundColor: "#F6EBE7",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: "#C47A5E",
    elevation: 15,
  },
});
