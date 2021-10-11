import { ApiFactoryInterface } from "../../../../domain/port/primary/api/api-factory.interface";
import FirebaseApiClient from "./firebase/firebase-api.client";

export default class ApiFactory implements ApiFactoryInterface{
    private firebase: FirebaseApiClient;
    constructor(){
        this.firebase = new FirebaseApiClient();
    }
    
    public getFirebase = () => this.firebase; 

}