import CreateShopUseCaseRequest from "../../domain/dto/request/create-shop-useCase.request";
import UpdateShopUseCaseRequest from "../../domain/dto/request/update-shop-useCase.request";
import ShopEntity from "../../domain/entity/shop.entity";
import { ApiFactoryInterface } from "../../domain/port/primary/api/api-factory.interface";
import CreateShopUseCase from "../../domain/useCase/shop/create-shop.useCase";
import UpdateShopUseCase from "../../domain/useCase/shop/update-shop.useCase";
import StorageFactory from "../adapter/secondary/storage/storage-factory.interface";
import NewUserShopCreatePresenter from "../presenter/new-user-shop-create.presenter";
import UpdateUserShopPresenter from "../presenter/update-user-shop.presenter";


interface CreateUserShopRequestInterface {
    shopName: string;
    shopDescription: string,
    shopCity: string,
    shopProvinceOrRegion: string,
    shopCountry: string
}

interface UpdateUserShopRequestInterface {
    shop: ShopEntity,
    latestShopCity: string,
    latestShopProvinceOrRegion: string,
    latestShopCountry: string
}

export default class ShopController {
    private apiFactory: ApiFactoryInterface;
    private storageFactory: StorageFactory;

    constructor(storageFactory: StorageFactory, apiFactory: ApiFactoryInterface) {
        this.apiFactory = apiFactory;
        this.storageFactory = storageFactory;
    }

    public createShop(input: CreateUserShopRequestInterface, presenter: NewUserShopCreatePresenter) {

        const useCaseRequest = new CreateShopUseCaseRequest(
            input.shopName, input.shopDescription,
            input.shopCity, input.shopProvinceOrRegion, input.shopCountry);

        const useCase = new CreateShopUseCase();

        useCase.execute(useCaseRequest, this.storageFactory, this.apiFactory, presenter);
    }

    public updateShop(input: UpdateUserShopRequestInterface, presenter: UpdateUserShopPresenter) {

        let locationChanged = false;
        if (input.latestShopCity != input.shop.getCity() ||
            input.latestShopCountry != input.shop.getCountry() ||
            input.latestShopProvinceOrRegion != input.shop.getProvinceOrRegion()) {

        }

        const useCaseRequest = new UpdateShopUseCaseRequest(
            input.shop, locationChanged
        );

        const useCase = new UpdateShopUseCase();

        useCase.execute(useCaseRequest, this.storageFactory, this.apiFactory, presenter);
    }
}