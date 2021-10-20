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

const rad = (x: any) => {
    return x * Math.PI / 180;
};

interface GPS_Point {
    latitude: number, 
    longitude: number
}

/**
 * Get distance btween two gps point in meters
 */
export const getGPSDistance = (p1: GPS_Point , p2: GPS_Point) => {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.latitude - p1.latitude);
    var dLong = rad(p2.longitude - p1.longitude);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.latitude)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
};