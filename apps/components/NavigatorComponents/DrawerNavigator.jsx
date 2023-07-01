import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNavigator from "./BottomTabNavigation";
import DrawerContainer from "./DrawerContainer";

const Drawer = createDrawerNavigator();
const DrawerStack = () => (
  <Drawer.Navigator
    screenOptions={{
      drawerStyle: { outerWidth: 180 },
      drawerPosition: "left",
      headerShown: false,
    }}
    drawerContent={({ navigation }) => (
      <DrawerContainer navigation={navigation} />
    )}
  >
    <Drawer.Screen name="Tab" component={BottomTabNavigator} />
  </Drawer.Navigator>
);

export default DrawerStack;

const styles = StyleSheet.create({});
