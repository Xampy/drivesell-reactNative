import { Platform } from "react-native"

export const getPlatformPath = ({ path, uri }: any) => {
    return Platform.select({
        android: { path },
        ios: { uri }
    })
}