import GetUserShopsFirebaseRequest from "../../../../../../dto/request/api/firebase/shop/get-user-shops-firebase.request";
import GetUserShopsFirebaseResponse from "../../../../../../dto/response/api/firebase/shop/get-user-shops-firebase.response";

export interface FirebaseUserApiServiceInterface {
    getShops: (request: GetUserShopsFirebaseRequest) => Promise<GetUserShopsFirebaseResponse>
}