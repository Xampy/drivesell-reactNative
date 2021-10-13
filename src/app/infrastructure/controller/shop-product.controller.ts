import CreateShopProductUseCaseRequest from "../../domain/dto/request/create-shop-product-useCase.request";
import UpdateShopProductUseCaseRequest from "../../domain/dto/request/update-shop-product-useCase.request";
import ShopProductEntity from "../../domain/entity/product.entity";
import ShopEntity from "../../domain/entity/shop.entity";
import { ApiFactoryInterface } from "../../domain/port/primary/api/api-factory.interface";
import CreateShopProductUseCase from "../../domain/useCase/product/create-shop-product.useCase";
import UpdateShopProductUseCase from "../../domain/useCase/product/update-shop-product.useCase";
import StorageFactory from "../adapter/secondary/storage/storage-factory.interface";
import NewUserShopProductCreatePresenter from "../presenter/new-user-shop-product-create.presenter";
import UpdateShopProductPresenter from "../presenter/update-shop-product.presenter";

interface CreateUserShopProductRequestInterface {
    shop: ShopEntity,
    product: ShopProductEntity
}

interface UpdateUserShopProductRequestInterface {
    shop: ShopEntity,
    product: ShopProductEntity;
    lastShopId: string | null
}

export default class ShopProductController {
    private apiFactory: ApiFactoryInterface;
    private storageFactory: StorageFactory;


    constructor(storageFactory: StorageFactory, apiFactory: ApiFactoryInterface) {
        this.apiFactory = apiFactory;
        this.storageFactory = storageFactory;
    }

    public createShopProduct(input: CreateUserShopProductRequestInterface,
        presenter: NewUserShopProductCreatePresenter) {

        const useCaseRequest = new CreateShopProductUseCaseRequest(
            input.product, input.shop);

        const useCase = new CreateShopProductUseCase();

        useCase.execute(useCaseRequest, this.storageFactory, this.apiFactory, presenter);
    }

    public updateShopProduct(input: UpdateUserShopProductRequestInterface,
        presenter: UpdateShopProductPresenter) {

        const useCaseRequest = new UpdateShopProductUseCaseRequest(
            input.product, input.shop, input.lastShopId
        );

        const useCase = new UpdateShopProductUseCase();

        useCase.execute(useCaseRequest, this.storageFactory, this.apiFactory, presenter);
    }
}