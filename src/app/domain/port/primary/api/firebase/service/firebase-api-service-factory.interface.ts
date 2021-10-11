import { FirebaseShopApiServiceInterface } from "./point/firebase-shop-api-service.interface";
import { FirebaseShopProductApiServiceInterface } from "./point/firebase-shop-product-api-service.interface";

export interface FirebaseApiServiceFactoryInterface {
    getShopService: () => FirebaseShopApiServiceInterface,
    getShopProductService: () => FirebaseShopProductApiServiceInterface
}