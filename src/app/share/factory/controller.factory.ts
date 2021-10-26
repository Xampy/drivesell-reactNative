import { ApiFactoryInterface } from "../../domain/port/primary/api/api-factory.interface";
import StorageFactory from "../../infrastructure/adapter/secondary/storage/storage-factory.interface";
import ProductOrderController from "../../infrastructure/controller/order.controller";
import ShopProductController from "../../infrastructure/controller/shop-product.controller";
import ShopController from "../../infrastructure/controller/shop.controller";
import UserController from "../../infrastructure/controller/user.controller";
import LoginContainer from "../container/login.container";

export default class  ControllerFactory {
    private shopController: ShopController;
    private shopProductController: ShopProductController;
    private userController: UserController;
    private productOrderController: ProductOrderController;

    constructor(storageFactory: StorageFactory, apiFactory: ApiFactoryInterface,  loginContainer: LoginContainer){
        this.shopController = new ShopController(storageFactory, apiFactory, loginContainer);
        this.shopProductController = new ShopProductController(storageFactory, apiFactory);
        this.userController = new UserController(storageFactory, apiFactory, loginContainer);
        this.productOrderController = new ProductOrderController(storageFactory, apiFactory, loginContainer);
    }

    public getShopController(){return this.shopController;}
    public getShopProductController(){return this.shopProductController}
    public getUserController(){return this.userController}
    public getProductOrderController(){return this.productOrderController}
}