import GetUserShopsFirebaseRequest from "../../../../../../dto/request/api/firebase/shop/get-user-shops-firebase.request";
import GetUserShopsFirebaseResponse from "../../../../../../dto/response/api/firebase/shop/get-user-shops-firebase.response";

export interface FirebaseUserApiServiceInterface {
    createShop: (request: {userId: string, shopId: string}) => Promise<boolean>,
    getShops: (request: GetUserShopsFirebaseRequest) => Promise<GetUserShopsFirebaseResponse>
}