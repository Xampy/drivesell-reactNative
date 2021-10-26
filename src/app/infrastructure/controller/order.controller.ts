import CreateOrderProductUseCaseRequest from "../../domain/dto/request/create-order-product-useCase.request";
import ShopProductEntity from "../../domain/entity/product.entity";
import ShopEntity from "../../domain/entity/shop.entity";
import { ApiFactoryInterface } from "../../domain/port/primary/api/api-factory.interface";
import CreateOrderShopProductUseCase from "../../domain/useCase/order/create-order-product.useCase";
import LoginContainer from "../../share/container/login.container";
import StorageFactory from "../adapter/secondary/storage/storage-factory.interface";
import CreateOrderShopProductPresenter from "../presenter/create-order-product.presenter";

interface CreateProductOrderRequestInterface {
    shop: ShopEntity, 
    product: ShopProductEntity, 
    coords: {
        latitude: string,
        longitude: string
    }
}


export default class ProductOrderController {
    private apiFactory: ApiFactoryInterface;
    private storageFactory: StorageFactory;
    private loginContainer: LoginContainer;

    constructor(storageFactory: StorageFactory, apiFactory: ApiFactoryInterface,
        loginContainer: LoginContainer) {
        this.apiFactory = apiFactory;
        this.storageFactory = storageFactory;
        this.loginContainer = loginContainer;
    }

    public createOrder(input: CreateProductOrderRequestInterface, presenter: CreateOrderShopProductPresenter){
        

        const useCaseRequest = new CreateOrderProductUseCaseRequest(
            input.shop, input.product, input.coords,
            this.loginContainer.userId
        );

        const useCase = new CreateOrderShopProductUseCase();

        useCase.execute(useCaseRequest, this.storageFactory, this.apiFactory, presenter);
    }
}