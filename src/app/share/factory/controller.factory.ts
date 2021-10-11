import { ApiFactoryInterface } from "../../domain/port/primary/api/api-factory.interface";
import StorageFactory from "../../infrastructure/adapter/secondary/storage/storage-factory.interface";
import ShopProductController from "../../infrastructure/controller/shop-product.controller";
import ShopController from "../../infrastructure/controller/shop.controller";

export default class  ControllerFactory {
    private shopController: ShopController;
    private shopProductController: ShopProductController;

    constructor(storageFactory: StorageFactory, apiFactory: ApiFactoryInterface){
        this.shopController = new ShopController(storageFactory, apiFactory);
        this.shopProductController = new ShopProductController(storageFactory, apiFactory);
    }

    public getShopController(){return this.shopController;}
    public getShopProductController(){return this.shopProductController}
}