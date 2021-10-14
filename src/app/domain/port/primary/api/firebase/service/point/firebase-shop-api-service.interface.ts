import CreateShopFirebaseRequest from "../../../../../../dto/request/api/firebase/shop/create-shop-firebase.request";
import GetShopFirebaseRequest from "../../../../../../dto/request/api/firebase/shop/get-shop-firebase.request";
import GetShopProductsFirebaseRequest from "../../../../../../dto/request/api/firebase/shop/get-shop-products-firebase.request";
import UpdateShopFirebaseRequest from "../../../../../../dto/request/api/firebase/shop/update-shop-firebase.request";
import CreateShopFirebaseResponse from "../../../../../../dto/response/api/firebase/shop/create-shop-firebase.response";
import GetShopFirebaseResponse from "../../../../../../dto/response/api/firebase/shop/get-shop-firebase.response";
import GetShopProductsFirebaseResponse from "../../../../../../dto/response/api/firebase/shop/get-shopProducts-firebase.response";
import UpdateShopFirebaseResponse from "../../../../../../dto/response/api/firebase/shop/update-shop-firebase.response";

export interface FirebaseShopApiServiceInterface {
    create: (request: CreateShopFirebaseRequest) => Promise<CreateShopFirebaseResponse>
    update: (request: UpdateShopFirebaseRequest) => Promise<UpdateShopFirebaseResponse>
    findByDoc: (request: GetShopFirebaseRequest) => Promise<GetShopFirebaseResponse>
    getProducts: (request: GetShopProductsFirebaseRequest) => Promise<GetShopProductsFirebaseResponse>
}