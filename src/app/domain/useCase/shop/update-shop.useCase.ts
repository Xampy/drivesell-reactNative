import CreateShopFirebaseRequest from "../../dto/request/api/firebase/shop/create-shop-firebase.request";
import UpdateShopFirebaseRequest from "../../dto/request/api/firebase/shop/update-shop-firebase.request";
import CreateShopUseCaseRequest from "../../dto/request/create-shop-useCase.request";
import UpdateShopUseCaseRequest from "../../dto/request/update-shop-useCase.request";
import CreateShopFirebaseResponse from "../../dto/response/api/firebase/shop/create-shop-firebase.response";
import UpdateShopFirebaseResponse from "../../dto/response/api/firebase/shop/update-shop-firebase.response";
import CreateShopUseCaseResponse from "../../dto/response/create-shop-useCase.response";
import UpdateShopUseCaseResponse from "../../dto/response/update-shop-useCase.response";
import ShopEntity from "../../entity/shop.entity";
import { ApiFactoryInterface } from "../../port/primary/api/api-factory.interface";
import StorageFactoryInterface from "../../port/secondary/storage/storage-factory.interface";
import { STORAGE_SHOPS_KEY } from "../../port/secondary/storage/storage.interface";
import NewUserShopCreatePresenterInterface from "../../presenter/new-user-shop-create-presenter.interface";
import UpdateUserShopPresenterInterface from "../../presenter/update-user-shop-presenter.interface";


class UpdateShopUseCase {

    constructor() { }

    public execute(useCaseRequest: UpdateShopUseCaseRequest,
        storageFactory: StorageFactoryInterface,
        apiFactory: ApiFactoryInterface, presenter: UpdateUserShopPresenterInterface) {

        const response: UpdateShopUseCaseResponse[] = [];

        const request = new UpdateShopFirebaseRequest(
            useCaseRequest.getShop(),
            useCaseRequest.getLocationChanged()
        );
        console.log("In create shop use case", request);

        apiFactory.getFirebase().getFirebaseApiServiceFactory()
            .getShopService()
            .update(request)
            .then(
                (result) => {
                    this.handleFirebaseCreateSuccess(
                        result, useCaseRequest, response,
                        storageFactory, presenter);
                }
            ).catch(
                (err) => {
                    console.log(err);
                    this.handleFirebaseCreateFailure(response, presenter);
                }
            )
    }

    private handleFirebaseCreateSuccess(result: UpdateShopFirebaseResponse,
        useCaseRequest: UpdateShopUseCaseRequest, response: UpdateShopUseCaseResponse[],
        storageFactory: StorageFactoryInterface, presenter: UpdateUserShopPresenterInterface) {

        response[0] = new UpdateShopUseCaseResponse(
            result.getShop(),
            null
        );

        //Store the data to local storage
        if (result.getShop() != null) {
            let shops = storageFactory.getLocalStorage().storage.shops;
            shops = shops.filter(s => s.id != useCaseRequest.getShop().getId() );

            shops.push(
                {
                    name: result.getShop()?.getName(),
                    description: result.getShop()?.getDescription(),
                    city: result.getShop()?.getCity(),
                    country: result.getShop()?.getCountry(),
                    provinceOrRegion: result.getShop()?.getProvinceOrRegion(),
                    id: result.getShop()?.getId(),
                }
            )

            storageFactory.getLocalStorage().storeObject(STORAGE_SHOPS_KEY, shops);
            console.log(storageFactory.getLocalStorage().getObject(STORAGE_SHOPS_KEY));
        }


        presenter.present(response[0]);
    }

    private handleFirebaseCreateFailure(response: UpdateShopUseCaseResponse[],
        presenter: UpdateUserShopPresenterInterface) {

        response[0] = new UpdateShopUseCaseResponse(
            null,
            new Error("An error occured")
        );
        presenter.present(response[0]);
    }
}

export default UpdateShopUseCase;