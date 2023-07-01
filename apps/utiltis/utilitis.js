import AsyncStorage from "@react-native-async-storage/async-storage";

const setLoginId = async (loginId) => {
  try {
    await AsyncStorage.setItem("loginId", loginId);
  } catch (error) {
    console.log("Error storing loginId:", error);
  }
};

const setToken = async (token) => {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (error) {
    console.log("Error storing token:", error);
  }
};

const getLoginId = async () => {
  try {
    const loginId = await AsyncStorage.getItem("loginId");
    return loginId;
  } catch (error) {
    console.log("Error getting loginId:", error);
    return null;
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    console.log("Error getting token:", error);
    return null;
  }
};
const getLoggedinStatus = async () => {
  try {
    const isLoggedIn = await AsyncStorage.getItem("isLoggedin");
    return isLoggedIn;
  } catch (error) {
    console.log("Error getting token:", error);
    return null;
  }
};

export { setToken, getToken, getLoggedinStatus, getLoginId };
