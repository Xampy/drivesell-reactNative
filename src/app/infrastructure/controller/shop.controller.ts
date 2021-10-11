import CreateShopUseCaseRequest from "../../domain/dto/request/create-shop-useCase.request";
import { ApiFactoryInterface } from "../../domain/port/primary/api/api-factory.interface";
import CreateShopUseCase from "../../domain/useCase/shop/create-shop.useCase";
import StorageFactory from "../adapter/secondary/storage/storage-factory.interface";
import NewUserShopCreatePresenter from "../presenter/new-user-shop-create.presenter";


interface CreateUserShopRequestInterface {
    shopName: string;
    shopDescription: string,
    shopCity: string,
    shopProvinceOrRegion: string,
    shopCountry: string
}

export default class ShopController {
    private apiFactory: ApiFactoryInterface;
    private storageFactory: StorageFactory;

    constructor(storageFactory: StorageFactory, apiFactory: ApiFactoryInterface){
        this.apiFactory = apiFactory;
        this.storageFactory = storageFactory;
    }

    public createShop(input: CreateUserShopRequestInterface, presenter: NewUserShopCreatePresenter){

        const useCaseRequest = new CreateShopUseCaseRequest(
            input.shopName, input.shopDescription,
            input.shopCity, input.shopProvinceOrRegion, input.shopCountry);
            
        const useCase = new CreateShopUseCase();

        useCase.execute(useCaseRequest, this.storageFactory, this.apiFactory, presenter);
    }
}