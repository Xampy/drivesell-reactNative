import AsyncStorageInterface from "../../../../domain/port/secondary/storage/async-storage.interface";
import StorageFactoryInterface from "../../../../domain/port/secondary/storage/storage-factory.interface";
import LocalAsyncStorageInterface from "./local-async.storage";

export default class StorageFactory implements StorageFactoryInterface {
    
    public storage: LocalAsyncStorageInterface;

    constructor(){
        this.storage = new LocalAsyncStorageInterface();
        this.storage.init();
    }

    public getLocalStorage(){
        return this.storage;
    }
   
}