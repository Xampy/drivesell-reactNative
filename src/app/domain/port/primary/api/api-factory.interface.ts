import FirebaseApiClient from "../../../../infrastructure/adapter/primary/api/firebase/firebase-api.client";

export interface ApiFactoryInterface {
    getFirebase: () => FirebaseApiClient
}