import CreateShopFirebaseRequest from "../../../../../../dto/request/api/firebase/shop/create-shop-firebase.request";
import CreateShopFirebaseResponse from "../../../../../../dto/response/api/firebase/shop/create-shop-firebase.response";
import CreateShopUseCaseResponse from "../../../../../../dto/response/create-shop-useCase.response";

export interface FirebaseShopApiServiceInterface {
    create: (request: CreateShopFirebaseRequest) => Promise<CreateShopFirebaseResponse>
}