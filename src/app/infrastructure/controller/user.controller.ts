import GetUserShopsUseCaseRequest from "../../domain/dto/request/get-user-shops-useCase.request";
import { ApiFactoryInterface } from "../../domain/port/primary/api/api-factory.interface";
import GetUserShopsUseCase from "../../domain/useCase/shop/get-user-shops.useCase";
import LoginContainer from "../../share/container/login.container";
import StorageFactory from "../adapter/secondary/storage/storage-factory.interface";
import GetUserShopsPresenter from "../presenter/get-user-shops.presenter";


interface GetUserShopsRequestInterface {
    city: string,
    provinceOrRegion: string,
    country: string
}

export default class UserController {
    private apiFactory: ApiFactoryInterface;
    private storageFactory: StorageFactory;
    private loginContainer: LoginContainer;

    constructor(storageFactory: StorageFactory, apiFactory: ApiFactoryInterface,
        loginContainer: LoginContainer) {
        this.apiFactory = apiFactory;
        this.storageFactory = storageFactory;
        this.loginContainer = loginContainer;
    }

    public getShops(input: GetUserShopsRequestInterface, presenter: GetUserShopsPresenter) {


        const useCaseRequest = new GetUserShopsUseCaseRequest(
            this.loginContainer.userId,
            input.country, input.provinceOrRegion, input.city
        );

        console.log("\n\nUser get shops use case request");
        console.log(input);

        const useCase = new GetUserShopsUseCase();

        useCase.execute(useCaseRequest, this.storageFactory, this.apiFactory, presenter);


    }
}
