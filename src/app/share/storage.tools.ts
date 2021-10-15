import { PermissionsAndroid } from "react-native";

export const requestStoragePermission = async () => {
    try {
        const granted = await PermissionsAndroid.requestMultiple(
            [
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            ]
        );
        if (
            granted["android.permission.WRITE_EXTERNAL_STORAGE"] === PermissionsAndroid.RESULTS.GRANTED &&
            granted["android.permission.READ_EXTERNAL_STORAGE"] === PermissionsAndroid.RESULTS.GRANTED
        ) {
            console.log("You can use the storage");
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