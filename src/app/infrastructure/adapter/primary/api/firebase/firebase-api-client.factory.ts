import { FirebaseApiClientFactoryInterface } from "../../../../../domain/port/primary/api/firebase/firebase-api-client-factory.interface";
import { FirebaseApiClientInterface } from "../../../../../domain/port/primary/api/firebase/firebase-api-client.interface";
import FirebaseApiClient from "./firebase-api.client";

export default class FirebaseApiClientFactory implements FirebaseApiClientFactoryInterface {
    
    private client: FirebaseApiClientInterface;
    constructor(){
        this.client = new FirebaseApiClient();
    }
    public getClient(){
        return this.client; 
    }
    
}