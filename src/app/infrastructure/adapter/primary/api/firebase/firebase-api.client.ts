import { FirebaseApiClientInterface } from "../../../../../domain/port/primary/api/firebase/firebase-api-client.interface";
import { FirebaseApiServiceFactoryInterface } from "../../../../../domain/port/primary/api/firebase/service/firebase-api-service-factory.interface";
import FirebaseApiServiceFactory  from "./service/firebase-api-service.factory";

export default class FirebaseApiClient implements FirebaseApiClientInterface {

    private serviceFactory: FirebaseApiServiceFactoryInterface;

    constructor(){
        this.serviceFactory = new FirebaseApiServiceFactory();
    }
    
    public getFirebaseApiServiceFactory(){
        return this.serviceFactory
    };

}