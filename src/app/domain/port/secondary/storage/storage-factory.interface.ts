import AsyncStorageInterface from "./async-storage.interface";

export default interface StorageFactoryInterface {
    getLocalStorage: () => AsyncStorageInterface
}