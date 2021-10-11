import { FirebaseApiServiceFactoryInterface } from "./service/firebase-api-service-factory.interface";

export interface FirebaseApiClientInterface {
    getFirebaseApiServiceFactory: () => FirebaseApiServiceFactoryInterface
}