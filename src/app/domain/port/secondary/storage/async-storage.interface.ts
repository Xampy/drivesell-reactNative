import StorageInterface from "./storage.interface";

export default interface AsyncStorageInterface extends StorageInterface {
    storeValue: (key: string, value: any) => void,
    storeObject: (key: string, value: any) => void,
    getValue: (key: string) => any | null,
    getObject: (key: string) => any | null,
}