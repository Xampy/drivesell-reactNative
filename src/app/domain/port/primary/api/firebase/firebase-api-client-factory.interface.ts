import { FirebaseApiClientInterface } from "./firebase-api-client.interface";

export interface FirebaseApiClientFactoryInterface {
    getClient: () => FirebaseApiClientInterface
}