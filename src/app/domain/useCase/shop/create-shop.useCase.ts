import CreateShopFirebaseRequest from "../../dto/request/api/firebase/shop/create-shop-firebase.request";
import CreateShopUseCaseRequest from "../../dto/request/create-shop-useCase.request";
import CreateShopFirebaseResponse from "../../dto/response/api/firebase/shop/create-shop-firebase.response";
import CreateShopUseCaseResponse from "../../dto/response/create-shop-useCase.response";
import ShopEntity from "../../entity/shop.entity";
import { ApiFactoryInterface } from "../../port/primary/api/api-factory.interface";
import StorageFactoryInterface from "../../port/secondary/storage/storage-factory.interface";
import { STORAGE_SHOPS_KEY } from "../../port/secondary/storage/storage.interface";
import NewUserShopCreatePresenterInterface from "../../presenter/new-user-shop-create-presenter.interface";

class CreateShopUseCase {

    constructor() { }

    public execute(useCaseRequest: CreateShopUseCaseRequest,
        storageFactory: StorageFactoryInterface,
        apiFactory: ApiFactoryInterface, presenter: NewUserShopCreatePresenterInterface) {

        const response: CreateShopUseCaseResponse[] = [];

        const request = new CreateShopFirebaseRequest(
            useCaseRequest.getName(),
            useCaseRequest.getDescription(),
            useCaseRequest.getCity(),
            useCaseRequest.getProvinceOrRegion(),
            useCaseRequest.getCountry(),
            useCaseRequest.getLatitude(),
            useCaseRequest.getLongitude()
        );
        console.log("In create shop use case", request);

        apiFactory.getFirebase().getFirebaseApiServiceFactory()
            .getShopService()
            .create(request)
            .then(
                (result) => {

                    const s = result.getShop();
                    if (s != null) {
                        apiFactory.getFirebase().getFirebaseApiServiceFactory()
                            .getUserService().createShop(
                                {
                                    userId: useCaseRequest.getUserId(),
                                    shopId: s.getId()
                                }
                            ).then(
                                () => {

                                }
                            ).catch(
                                (err) => {
                                    console.log(err);
                                }
                            )
                        this.handleFirebaseCreateSuccess(
                            result, apiFactory,
                            useCaseRequest, response,
                            storageFactory, presenter);
                    }

                }
            ).catch(
                (err) => {
                    console.log(err);
                    this.handleFirebaseCreateFailure(response, presenter);
                }
            )
    }

    private handleFirebaseCreateSuccess(result: CreateShopFirebaseResponse,
        apiFactory: ApiFactoryInterface,
        useCaseRequest: CreateShopUseCaseRequest, response: CreateShopUseCaseResponse[],
        storageFactory: StorageFactoryInterface, presenter: NewUserShopCreatePresenterInterface) {

        response[0] = new CreateShopUseCaseResponse(
            result.getShop(),
            null
        );

        //Store the data to local storage
        if (result.getShop() != null) {
            const shops = storageFactory.getLocalStorage().storage.shops;
            shops.push(
                {
                    name: useCaseRequest.getName(),
                    description: useCaseRequest.getDescription(),
                    city: useCaseRequest.getCity(),
                    country: useCaseRequest.getCountry(),
                    provinceOrRegion: useCaseRequest.getProvinceOrRegion(),
                    id: result.getShop()?.getId(),
                }
            )

            storageFactory.getLocalStorage().storeObject(STORAGE_SHOPS_KEY, shops);
            console.log(storageFactory.getLocalStorage().getObject(STORAGE_SHOPS_KEY));
        }


        presenter.present(response[0]);
    }

    private handleFirebaseCreateFailure(response: CreateShopUseCaseResponse[],
        presenter: NewUserShopCreatePresenterInterface) {

        response[0] = new CreateShopUseCaseResponse(
            null,
            new Error("An error occured")
        );
        presenter.present(response[0]);
    }
}

export default CreateShopUseCase;