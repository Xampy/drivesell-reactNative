import FirebasProductOrderApiServiceInterface from "./point/firebase-order-api-service.interface";
import { FirebaseShopApiServiceInterface } from "./point/firebase-shop-api-service.interface";
import { FirebaseShopProductApiServiceInterface } from "./point/firebase-shop-product-api-service.interface";
import { FirebaseUserApiServiceInterface } from "./point/firebase-user-api-service.interface";

export interface FirebaseApiServiceFactoryInterface {
    getShopService: () => FirebaseShopApiServiceInterface,
    getShopProductService: () => FirebaseShopProductApiServiceInterface,
    getUserService: () => FirebaseUserApiServiceInterface,
    getProductOrderService: () => FirebasProductOrderApiServiceInterface
}