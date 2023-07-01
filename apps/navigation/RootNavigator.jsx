import { Image, Pressable } from "react-native";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreens";
import UserGroupScreen from "../screens/UserGroupScreen";
import OrganizationLogin from "../screens/organizationLogin";
import NormalUserLogin from "../screens/NormalUserLogin";
import { backBtnWhite, backBtnblack } from "../constants/image";
import DrawerStack from "../components/NavigatorComponents/DrawerNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLoggedinStatus, getToken } from "../utiltis/utilitis";
import Splash from "../screens/splashScreen";

const Stack = createStackNavigator();

const Left = ({ onPress, isBlack }) => (
  <Pressable style={{ marginLeft: 10 }} onPress={onPress}>
    <Image source={isBlack ? backBtnblack : backBtnWhite} />
  </Pressable>
);

const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="splash"
        component={Splash}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="WelcomeScreen"
        component={WelcomeScreen}
      />
      <Stack.Screen
        options={{
          headerBackImage: ({ goBack }) => <Left onPress={() => goBack()} />,
          title: "",
          headerTransparent: true,
        }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={({ navigation, route }) => ({
          headerBackImage: () => (
            <Left
              isBlack
              onPress={() => navigation.navigate("WelcomeScreen")}
            />
          ),
          title: "",
          headerTransparent: true,
        })}
        name="UserGroup"
        component={UserGroupScreen}
      />
      <Stack.Screen
        options={({ navigation, route }) => ({
          headerBackImage: () => (
            <Left onPress={() => navigation.navigate("WelcomeScreen")} />
          ),
          title: "",
          headerTransparent: true,
        })}
        name="OrganizationUser"
        component={OrganizationLogin}
      />
      <Stack.Screen
        options={({ navigation, route }) => ({
          headerBackImage: () => (
            <Left onPress={() => navigation.navigate("WelcomeScreen")} />
          ),
          title: "",
          headerTransparent: true,
        })}
        name="NormalUserLogin"
        component={NormalUserLogin}
      />
      <Stack.Screen
        options={({ navigation, route }) => ({
          headerBackImage: () => (
            <Left onPress={() => navigation.navigate("WelcomeScreen")} />
          ),
          title: "",
          headerTransparent: true,
        })}
        name="RegisterUser"
        component={OrganizationLogin}
      />
    </Stack.Navigator>
  );
};

const RootNavigator = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  React.useEffect(() => {
    checkLoginState();
  }, []);
  const checkLoginState = async () => {
    try {
      const isToken = await getToken();
      if (isToken) {
        setIsLoggedIn(true);
      } else {
        console.log("bye");
      }
    } catch (error) {}
  };
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginStack" component={LoginStack} />
      <Stack.Screen name="DrawerStack" component={DrawerStack} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
