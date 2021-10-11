import CreateShopProductFirebaseRequest from "../../../../../../dto/request/api/firebase/product/create-shop-product-firebase.request";
import CreateShopProductFirebaseResponse from "../../../../../../dto/response/api/firebase/product/create-shop-product-firebase.response";

export interface FirebaseShopProductApiServiceInterface {
    create: (request: CreateShopProductFirebaseRequest) => Promise<CreateShopProductFirebaseResponse>
}