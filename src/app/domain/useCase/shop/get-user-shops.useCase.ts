import CreateShopFirebaseRequest from "../../dto/request/api/firebase/shop/create-shop-firebase.request";
import GetShopFirebaseRequest from "../../dto/request/api/firebase/shop/get-shop-firebase.request";
import GetUserShopsFirebaseRequest from "../../dto/request/api/firebase/shop/get-user-shops-firebase.request";
import CreateShopUseCaseRequest from "../../dto/request/create-shop-useCase.request";
import GetUserShopsUseCaseRequest from "../../dto/request/get-user-shops-useCase.request";
import CreateShopFirebaseResponse from "../../dto/response/api/firebase/shop/create-shop-firebase.response";
import GetUserShopsFirebaseResponse from "../../dto/response/api/firebase/shop/get-user-shops-firebase.response";
import CreateShopUseCaseResponse from "../../dto/response/create-shop-useCase.response";
import GetUserShopsUseCaseResponse from "../../dto/response/get-user-shops-useCase.response";
import ShopEntity from "../../entity/shop.entity";
import { ApiFactoryInterface } from "../../port/primary/api/api-factory.interface";
import StorageFactoryInterface from "../../port/secondary/storage/storage-factory.interface";
import { STORAGE_SHOPS_KEY } from "../../port/secondary/storage/storage.interface";
import GetUserShopsPresenterInterface from "../../presenter/get-user-shops-presenter.interface";
import NewUserShopCreatePresenterInterface from "../../presenter/new-user-shop-create-presenter.interface";

class GetUserShopsUseCase {

    constructor() { }

    public execute(useCaseRequest: GetUserShopsUseCaseRequest,
        storageFactory: StorageFactoryInterface,
        apiFactory: ApiFactoryInterface, presenter: GetUserShopsPresenterInterface) {

        const response: GetUserShopsUseCaseResponse[] = [];

        const request = new GetUserShopsFirebaseRequest(
            useCaseRequest.getUserId()
        );
        console.log("In get user shops use case", request);

        apiFactory.getFirebase().getFirebaseApiServiceFactory()
            .getUserService()
            .getShops(request)
            .then(
                (result) => {
                    console.log(result);
                    this.handleFirebaseGetUserShopsSuccess(
                        result, apiFactory,
                        useCaseRequest, response,
                        storageFactory, presenter);
                }
            ).catch(
                (err) => {
                    console.log(err);
                    this.handleFirebaseGetUserShopsFailure(response, presenter);
                }
            )
    }

    private async handleFirebaseGetUserShopsSuccess(result: GetUserShopsFirebaseResponse,
        apiFactory: ApiFactoryInterface,
        useCaseRequest: GetUserShopsUseCaseRequest, response: GetUserShopsUseCaseResponse[],
        storageFactory: StorageFactoryInterface, presenter: GetUserShopsPresenterInterface) {

        const userShops: ShopEntity[] = [];
        //For each dhop document id, we fecth the object
        if (result.getUserShops() != null) {
            const shopsId = result.getUserShops();
            console.log("\n\nIds ");
            console.log(shopsId);
            console.log(useCaseRequest);

            if (shopsId != null) {
                const l = shopsId.length;

                for (let index = 0; index < l; index++) {
                    const id = shopsId[index];

                    let request = new GetShopFirebaseRequest(
                        id,
                        useCaseRequest.getCountry(),
                        useCaseRequest.getProvinceOrRegion(),
                        useCaseRequest.getCity()
                    );

                    try {
                        let res = await apiFactory.getFirebase().getFirebaseApiServiceFactory()
                            .getShopService().findByDoc(request);

                        const shop = res.getShop();
                        if (shop != null) {
                            console.log("[GOT USER SHOP FOR ID=" + id + "]");
                            userShops.push(shop);
                        }

                    } catch (error) {
                        response[0] = new GetUserShopsUseCaseResponse(
                            null,
                            new Error("An error occured")
                        );
                        presenter.present(response[0]);
                        break;
                    }
                }

                response[0] = new GetUserShopsUseCaseResponse(
                    userShops,
                    null
                );
                presenter.present(response[0]);
            }
        } else {
            response[0] = new GetUserShopsUseCaseResponse(
                null,
                new Error("An error occured")
            );
            presenter.present(response[0]);
        }





    }

    private handleFirebaseGetUserShopsFailure(response: GetUserShopsUseCaseResponse[],
        presenter: GetUserShopsPresenterInterface) {

        response[0] = new GetUserShopsUseCaseResponse(
            null,
            new Error("An error occured")
        );
        presenter.present(response[0]);
    }
}

export default GetUserShopsUseCase;