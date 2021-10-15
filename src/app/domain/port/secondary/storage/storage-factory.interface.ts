import AsyncStorageInterface from "./async-storage.interface";
import FirebaseStorageInterface from "./firebase-storage.interface";

export default interface StorageFactoryInterface {
    getLocalStorage: () => AsyncStorageInterface,
    getFirebaseStorage: () => FirebaseStorageInterface
}