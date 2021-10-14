import CreateShopFirebaseRequest from "../../../../../../dto/request/api/firebase/shop/create-shop-firebase.request";
import GetShopFirebaseRequest from "../../../../../../dto/request/api/firebase/shop/get-shop-firebase.request";
import GetUserShopsFirebaseRequest from "../../../../../../dto/request/api/firebase/shop/get-user-shops-firebase.request";
import UpdateShopFirebaseRequest from "../../../../../../dto/request/api/firebase/shop/update-shop-firebase.request";
import CreateShopFirebaseResponse from "../../../../../../dto/response/api/firebase/shop/create-shop-firebase.response";
import GetShopFirebaseResponse from "../../../../../../dto/response/api/firebase/shop/get-shop-firebase.response";
import GetUserShopsFirebaseResponse from "../../../../../../dto/response/api/firebase/shop/get-user-shops-firebase.response";
import UpdateShopFirebaseResponse from "../../../../../../dto/response/api/firebase/shop/update-shop-firebase.response";
import CreateShopUseCaseResponse from "../../../../../../dto/response/create-shop-useCase.response";

export interface FirebaseShopApiServiceInterface {
    create: (request: CreateShopFirebaseRequest) => Promise<CreateShopFirebaseResponse>
    update: (request: UpdateShopFirebaseRequest) => Promise<UpdateShopFirebaseResponse>
    findByDoc: (request: GetShopFirebaseRequest) => Promise<GetShopFirebaseResponse>
}