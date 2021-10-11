import { FirebaseApiServiceFactoryInterface } from "../../../../../../domain/port/primary/api/firebase/service/firebase-api-service-factory.interface";
import { FirebaseShopApiServiceInterface } from "../../../../../../domain/port/primary/api/firebase/service/point/firebase-shop-api-service.interface";
import { FirebaseShopProductApiServiceInterface } from "../../../../../../domain/port/primary/api/firebase/service/point/firebase-shop-product-api-service.interface";
import FirebaseShopApiService from "./point/firebase-shop-api.service";
import FirebaseShopProductApiService from "./point/firebase-shop-product-api.service";

export default class FirebaseApiServiceFactory implements FirebaseApiServiceFactoryInterface {

    private shopService: FirebaseShopApiServiceInterface;
    private shopProductService: FirebaseShopProductApiServiceInterface;

    constructor() {
        this.shopService = new FirebaseShopApiService();
        this.shopProductService = new FirebaseShopProductApiService();
    }
    public getShopProductService() { return this.shopProductService; }
    public getShopService() { return this.shopService; }

}