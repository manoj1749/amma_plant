import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserProfile from "../screens/UserProfileScreen";
import AddImage from "../screens/AddImageScreen";
import homeScreen from "../screens/HomeScreen";
import splashScreen from "../screens/splashScreen";
import { Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import { selectUser, selectUsersDetails } from "../redux/slices/userSlice";
import SignInPage from "../screens/signInScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import Splash from "../screens/splashScreen";
import DrawerStack from "../components/NavigatorComponents/DrawerNavigator";
import Header from "../components/common/Header";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Icons } from "../constants/Icons";

import LoginScreen from "../screens/LoginScreens";
import UserGroupScreen from "../screens/UserGroupScreen";
import OrganizationLogin from "../screens/organizationLogin";
import NormalUserLogin from "../screens/NormalUserLogin";

const Stack = createStackNavigator();
const Left = ({ onPress, isBlack }) => (
  <TouchableHighlight onPress={onPress}>
    <Image
      source={
        isBlack
          ? require("../assets/image/backblack.png")
          : require("../assets/image/backWhite.png")
      }
    />
  </TouchableHighlight>
);
const Headers = ({ onPress, isBlack }) => (
  <View>
    <TouchableOpacity onPress={onPress} style={{ marginRight: 15 }}>
      <Image
        source={
          isBlack
            ? require("../assets/image/backblack.png")
            : require("../assets/image/backWhite.png")
        }
      />
    </TouchableOpacity>
  </View>
);
const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Welcome"
        component={WelcomeScreen}
      />
      <Stack.Screen
        options={{
          headerBackImage: ({ navigation }) => (
            <Left onPress={() => navigation.navigate("WelcomeScreen")} />
          ),
          title: "",
          headerTransparent: true,
        }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          headerBackImage: ({ navigation }) => (
            <Left
              onPress={() => navigation.navigate("WelcomeScreen")}
              isBlack
            />
          ),
          title: "",
          headerTransparent: true,
        }}
        name="UserGroup"
        component={UserGroupScreen}
      />
      <Stack.Screen
        options={{
          headerBackImage: ({ navigation }) => (
            <Left onPress={() => navigation.navigate("WelcomeScreen")} />
          ),
          title: "",
          headerTransparent: true,
        }}
        name="OrganizationUser"
        component={OrganizationLogin}
      />
      <Stack.Screen
        options={{
          headerBackImage: ({ navigation }) => (
            <Left onPress={() => navigation.navigate("WelcomeScreen")} />
          ),
          title: "",
          headerTransparent: true,
        }}
        name="NormalUserLogin"
        component={NormalUserLogin}
      />
      <Stack.Screen
        options={{
          headerBackImage: ({ navigation }) => (
            <Left onPress={() => navigation.navigate("WelcomeScreen")} />
          ),
          title: "",
          headerTransparent: true,
        }}
        name="RegisterUser"
        component={OrganizationLogin}
      />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginStack" component={LoginStack} />
      {/* <Stack.Screen name="DrawerStack" component={DrawerStack} /> */}
    </Stack.Navigator>
  );
};

export default RootNavigator;
