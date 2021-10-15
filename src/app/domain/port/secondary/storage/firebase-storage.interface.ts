import { FirebaseStorageTypes } from "@react-native-firebase/storage";

export default interface FirebaseStorageInterface {
    uploadFile: (ref: string, name: string, file: any) => Promise<string| undefined>
}