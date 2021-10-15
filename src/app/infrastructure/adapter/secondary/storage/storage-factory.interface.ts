import AsyncStorageInterface from "../../../../domain/port/secondary/storage/async-storage.interface";
import FirebaseStorageInterface from "../../../../domain/port/secondary/storage/firebase-storage.interface";
import firebaseStorageInterface from "../../../../domain/port/secondary/storage/firebase-storage.interface";
import StorageFactoryInterface from "../../../../domain/port/secondary/storage/storage-factory.interface";
import FirebaseStorage from "./firebase.storage";
import LocalAsyncStorageInterface from "./local-async.storage";

export default class StorageFactory implements StorageFactoryInterface {
    
    public storage: LocalAsyncStorageInterface;
    public firebaseStorage: FirebaseStorageInterface;

    constructor(){
        this.firebaseStorage = new FirebaseStorage();
        this.storage = new LocalAsyncStorageInterface();
        this.storage.init();
    }
    getFirebaseStorage(){
        return this.firebaseStorage;
    }

    public getLocalStorage(){
        return this.storage;
    }
   
}