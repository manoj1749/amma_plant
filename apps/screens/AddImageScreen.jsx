import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  PermissionsAndroid,
  ImageBackground,
  TextInput,
  ScrollView,
  Pressable,
  Dimensions,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useLocation, {
  requestLocationPermission,
  useGeolocation,
} from "../hooks/useGeoLocation";
import Toast from "react-native-toast-message";
import { add, avatarBoy, camera, edit } from "../constants/image";
import CommonSwitch from "../components/common/commonSwitch";
import CommonInput from "../components/common/commonInput";
import CommonButton from "../components/common/CommonButton";
import withCameraAndLibrary from "../HOC/withCameraAndLibrary";
import CommonModal from "../components/common/commonModal";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Map from "../components/Map";
import { postAction } from "../redux/action/PostAction";
import { useFocusEffect } from "@react-navigation/native";
import Loader from "../components/Loader";
import { fetchLocationName } from "../redux/action/AuthAction";
import { DELETE_LOCATION } from "../redux/actionTypes";
import Geolocation from "react-native-geolocation-service";
const intailState = () => {
  return {
    description: "",
    tags: "",
    liveLocation: false,
    isVisible: false,
    imageUrL: null,
    error: false,
    selectionRoundCorner: false,
    selectionMode: 0,
    longitude: null,
    latitude: null,
  };
};
const AddImage = ({ setOpenCamera, imageUri, navigation }) => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState(intailState());
  const { geoLocation, isLoadingLocation, selectedLocation } = useSelector(
    (state) => state.auth
  );
  const { isUploadLoading, userDetail, isSuccessfullyPost } = useSelector(
    (state) => state.post
  );
  const { longitude, latitude } = state;
  const {
    description,
    tags,
    liveLocation,
    isVisible,
    imageUrL,
    selectionMode,
    selectionRoundCorner,
  } = state;
  React.useEffect(() => {
    if (description !== "") {
      setState((prev) => ({
        ...prev,
        error: false,
      }));
    }
  }, [description]);
  const getGeoLocaation = () => {
    const config = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
    };

    Geolocation.getCurrentPosition(
      (info) =>
        setState((prev) => ({
          ...prev,
          longitude: info.coords.longitude,
          latitude: info.coords.latitude,
        })),

      (error) => console.log("ERROR", error),
      config
    );
  };
  React.useEffect(() => {
    if (liveLocation) {
      console.log("workin");
      requestLocationPermission();
      getGeoLocaation();
      Toast.show({
        type: "SuccessToast",
        text1: "Live Location Captured",
      }),
        dispatch({
          type: DELETE_LOCATION,
        });
    }
  }, [liveLocation]);
  React.useEffect(() => {
    if (imageUri) {
      const data = imageUri.hasOwnProperty("didCancel")
        ? null
        : imageUri.assets[0].uri;
      setState((prev) => ({
        ...prev,
        imageUrL: data,
      }));
    }
  }, [imageUri]);
  React.useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      setState((prev) => ({
        ...prev,
        description: "",
        test: "",
        imageUrL: null,
        liveLocation: false,
        selectionMode: 0,
        longitude: null,
        latitude: null,
      }));
    });
    return focusHandler;
  }, [navigation]);
  React.useEffect(() => {
    if (isSuccessfullyPost) {
      setState((prev) => ({
        ...prev,
        description: "",
        test: "",
        imageUrL: null,
        liveLocation: true,
        selectionMode: 0,
        longitude: null,
        latitude: null,
      }));
    }
  }, [isSuccessfullyPost]);

  const handleChange = (name) => (event) => {
    event.persist();
    setState((prev) => ({
      ...prev,
      [name]: event?.nativeEvent?.text,
    }));
  };
  const onOpenCameraPopup = () => {
    setOpenCamera(true);
  };

  const onClose = () => {
    setState((prev) => ({
      ...prev,
      liveLocation: false,
      isVisible: false,
    }));
  };
  const onLocationSelect = (event) => {
    const { longitude, latitude } = event.nativeEvent.coordinate;
    dispatch(fetchLocationName(latitude, longitude));
    onClose();
  };
  const validateForm = () => {
    if (description === "") {
      setState((prev) => ({
        ...prev,
        error: true,
      }));
    }
  };
  const handleUpdate = () => {
    validateForm();
    const body = {
      description,
      tags,
      longtitude: liveLocation
        ? longitude
        : geoLocation
        ? geoLocation.lat
        : longitude,
      latitude: liveLocation
        ? latitude
        : geoLocation
        ? geoLocation.lat
        : latitude,
      imageUri,
      id: userDetail.id,
    };
    dispatch(postAction(body));
  };
  console.log(liveLocation, longitude, latitude, geoLocation, "livelocation");
  const updatedSwitchData = (val) => {
    if (val === 1) {
      setState((prev) => ({
        ...prev,
        selectionMode: 1,
        liveLocation: true,
      }));
    } else if (val === 2) {
      setState((prev) => ({
        ...prev,
        selectionMode: 2,
        liveLocation: false,
        isVisible: true,
      }));
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={styles.firstContainer}>
          {imageUrL ? (
            <ImageBackground
              source={{ uri: imageUrL }}
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={styles.overlay} />
              <Pressable onPress={onOpenCameraPopup}>
                <Image source={edit} />
              </Pressable>
            </ImageBackground>
          ) : (
            <Pressable onPress={onOpenCameraPopup}>
              <Image source={add} />
            </Pressable>
          )}
        </View>
        <View style={styles.secondContainer}>
          <CommonInput
            name={"description"}
            placeholder={"Description"}
            placeholderTextColor="#00000090"
            onChange={handleChange("description")}
            value={description}
            isErr={state.error}
          />
          <CommonInput
            name={"tags"}
            placeholder={"Tags"}
            placeholderTextColor="#00000090"
            onChange={handleChange("tags")}
            value={tags}
          />
          <View style={{ justifyContent: "flex-end" }}>
            <CommonSwitch
              selectionMode={selectionMode}
              roundCorner={selectionRoundCorner}
              option1={"ON"}
              option2={"OFF"}
              selectionColor={"#C47A5E"}
              isLoadingLocation={isLoadingLocation}
              updatedSwitchData={updatedSwitchData}
            />
          </View>

          <CommonButton
            title={"UPLOAD"}
            onPress={handleUpdate}
            // disabled={description === "" || imageUrL === null}
            isLoading={isUploadLoading}
          />
        </View>
        {!liveLocation && (
          <CommonModal
            isVisible={isVisible}
            onClose={onClose}
            children={
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  borderRadius: 10,
                }}
              >
                <Map onLocationSelect={onLocationSelect} />
              </View>
            }
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default withCameraAndLibrary(AddImage);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  firstContainer: {
    flex: 0.3,
    backgroundColor: "#C47A5E10",
    alignItems: "center",
    justifyContent: "center",
  },
  secondContainer: {
    flex: 0.8,
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  overlay: {
    width: "100%",
    backgroundColor:
      "linear-gradient(180deg, rgba(0, 0, 0, 0.0996369) 16.67%, rgba(245, 245, 245, 0.10) 55.21%, rgba(0, 0, 0, 0.10) 65.62%, rgba(0, 0, 0, 0.1989583) 99.99%, rgba(0, 0, 0, 0.5) 100%)",
    height: "100%",
    position: "absolute",
  },
  input: {
    margin: 12,
    borderWidth: 0,
    width: 370,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    color: "black",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
