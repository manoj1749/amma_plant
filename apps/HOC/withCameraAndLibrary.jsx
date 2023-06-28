import React from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Image,
  Text,
  PermissionsAndroid,
} from "react-native";
import CommonModal from "../components/common/commonModal";
import { CommonColor } from "../constants/colors";
import { camera, library } from "../constants/image";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useRoute, useNavigation } from "@react-navigation/native";

const withCameraAndLibrary = (WrappedComponent) => {
  return ({ navigation }) => {
    const route = useRoute();
    const [openCamera, setOpenCamera] = React.useState(false);
    const [uri, setUri] = React.useState("");
    React.useEffect(() => {
      const focusHandler = navigation.addListener("focus", () => {
        setUri("");
      });
      return focusHandler;
    }, [navigation]);
    const onImageLibraryPress = async () => {
      let options = {
        saveToPhotos: true,
        mediaType: "photo",
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.9,
      };
      const response = await launchImageLibrary(options);

      setUri(response);
      setOpenCamera(false);
    };

    const onCameraPress = async () => {
      try {
        let options = {
          saveToPhotos: true,
          mediaType: "photo",
          maxWidth: 500,
          maxHeight: 500,
          quality: 0.8,
          cropping: true,
          cropperToolbarTitle: "crop",
          cropperCircleOverlay: true,
        };
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "App Camera Permission",
            message: "App needs access to your camera ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const response = await launchCamera(options);
          setUri(response);
          setOpenCamera(false);
        } else {
          console.log("Camera permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };
    return (
      <>
        <WrappedComponent
          imageUri={uri}
          setOpenCamera={setOpenCamera}
          isRegisterUser={route?.params?.isRegisterUser}
          navigation={navigation}
        />
        {openCamera && (
          <CommonModal
            isVisible={openCamera}
            onClose={() => setOpenCamera(false)}
            isBottom
            children={
              <View style={styles.cameraCard}>
                <Pressable style={styles.cameraButton} onPress={onCameraPress}>
                  <Image source={camera} />
                  <Text style={styles.cameraText}>Camera</Text>
                </Pressable>
                <Pressable
                  style={styles.cameraButton}
                  onPress={onImageLibraryPress}
                >
                  <Image source={library} />
                  <Text style={styles.cameraText}>Library</Text>
                </Pressable>
              </View>
            }
          />
        )}
      </>
    );
  };
};
export default withCameraAndLibrary;
const styles = StyleSheet.create({
  cameraCard: {
    flex: 0.1,
    backgroundColor: CommonColor.secondary,
    borderRadius: 30,
    marginHorizontal: 15,
    paddingHorizontal: 50,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 50,
    shadowColor: "#F24E1E",
  },
  cameraButton: {
    alignItems: "center",
  },
  cameraText: {
    color: "black",
    fontWeight: "600",
    letterSpacing: 1,
    lineHeight: 25,
  },
});
