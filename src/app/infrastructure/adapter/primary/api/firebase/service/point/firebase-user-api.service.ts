import GetUserShopsFirebaseRequest from "../../../../../../../domain/dto/request/api/firebase/shop/get-user-shops-firebase.request";
import GetUserShopsFirebaseResponse from "../../../../../../../domain/dto/response/api/firebase/shop/get-user-shops-firebase.response";
import { FirebaseUserApiServiceInterface } from "../../../../../../../domain/port/primary/api/firebase/service/point/firebase-user-api-service.interface";

import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

export const DEFAULT_USER_FIREBASE_DOC_ID = "gfOVAAjeDDYQ6nwTsFnh";


export default class FirebaseUserApiService implements FirebaseUserApiServiceInterface {

    public getShops(request: GetUserShopsFirebaseRequest) {
        return new Promise<GetUserShopsFirebaseResponse>(
            (resolve, reject) => {
                this.handleGetShops(request, resolve, reject);
            }
        );
    }

    private handleGetShops(request: GetUserShopsFirebaseRequest,
        resolve: Function, reject: Function) {
        let response: GetUserShopsFirebaseResponse;

        const path: string = "users";
        
        console.log("User " + request.getUserDocId());
        firestore().collection(path).doc(request.getUserDocId())
            .get().then(
                (doc) => {
                    const data = doc.data();
                    console.log(doc);

                    if(!doc.exists){
                        console.log("Doc not exists...");
                    }
                    if (data != undefined){
                        response = new GetUserShopsFirebaseResponse(
                            data.shops, null
                        )
                    }
                    else {
                        response = new GetUserShopsFirebaseResponse(
                            null, new Error("An error occuured")
                        )
                    }

                    resolve(response);
                }
            ).catch(
                (error) => {
                    console.log(error);
                    reject(error);
                }
            );
    }
}