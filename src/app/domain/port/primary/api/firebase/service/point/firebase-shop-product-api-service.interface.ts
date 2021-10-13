import CreateShopProductFirebaseRequest from "../../../../../../dto/request/api/firebase/product/create-shop-product-firebase.request";
import UpdateShopProductFirebaseRequest from "../../../../../../dto/request/api/firebase/product/update-shop-product-firebase.request";
import CreateShopProductFirebaseResponse from "../../../../../../dto/response/api/firebase/product/create-shop-product-firebase.response";
import UpdateShopProductFirebaseResponse from "../../../../../../dto/response/api/firebase/product/update-shop-product-firebase.response";

export interface FirebaseShopProductApiServiceInterface {
    create: (request: CreateShopProductFirebaseRequest) => Promise<CreateShopProductFirebaseResponse>,
    update: (request: UpdateShopProductFirebaseRequest) => Promise<UpdateShopProductFirebaseResponse>
}