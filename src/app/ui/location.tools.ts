import { PermissionsAndroid } from "react-native";

export const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message:
              "We needs access to your location",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
  
        const grantedCoarse = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          {
            title: "Location Permission",
            message:
              "We needs access to your location",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED && grantedCoarse === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the camera");
          return true;
        } else {
          console.log("Camera permission denied");
          return false;
        }
      } catch (err) {
        console.warn(err);
        return null;
      }
  };