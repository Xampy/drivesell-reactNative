import GetShopFirebaseRequest from "../dto/request/api/firebase/shop/get-shop-firebase.request";
import GetShopProductsFirebaseRequest from "../dto/request/api/firebase/shop/get-shop-products-firebase.request";
import GetShopsFirebaseRequest from "../dto/request/api/firebase/shop/get-shops-firebase.request";
import GetUserShopsFirebaseRequest from "../dto/request/api/firebase/shop/get-user-shops-firebase.request";
import GetLocalShopsProductsUseCaseRequest from "../dto/request/get-local-product-useCase.request";
import GetUserShopsUseCaseRequest from "../dto/request/get-user-shops-useCase.request";
import GetShopsFirebaseResponse from "../dto/response/api/firebase/shop/get-shops-firebase.response";
import GetUserShopsFirebaseResponse from "../dto/response/api/firebase/shop/get-user-shops-firebase.response";
import GetLocalShopsProductsUseCaseResponse from "../dto/response/get-local-product-useCase.response";
import GetUserShopsUseCaseResponse from "../dto/response/get-user-shops-useCase.response";
import ShopProductEntity from "../entity/product.entity";
import ShopEntity from "../entity/shop.entity";
import { ApiFactoryInterface } from "../port/primary/api/api-factory.interface";
import StorageFactoryInterface from "../port/secondary/storage/storage-factory.interface";
import GetLocalShopsProductsPresenterInterface from "../presenter/get-local-shops-products-presenter.interface";
import GetUserShopsPresenterInterface from "../presenter/get-user-shops-presenter.interface";
import GetUserShopsUseCase from "./shop/get-user-shops.useCase";

class GetLocalShopsProductsUseCase {

    constructor() { }

    public execute(useCaseRequest: GetLocalShopsProductsUseCaseRequest,
        storageFactory: StorageFactoryInterface,
        apiFactory: ApiFactoryInterface, presenter: GetLocalShopsProductsPresenterInterface) {

        const useCaseResponse: GetLocalShopsProductsUseCaseResponse[] = [];

        const request = new GetShopsFirebaseRequest(
            useCaseRequest.getCountry(),
            useCaseRequest.getProvinceOrRegion(),
            useCaseRequest.getCity()
        );
        console.log("\n\n\nIn get shops use case", request);

        apiFactory.getFirebase().getFirebaseApiServiceFactory()
            .getShopService()
            .findByLocation(request)
            .then(
                (result) => {
                    console.log(result);
                    this.handleFirebaseGetShopsSuccess(
                        result, apiFactory,
                        useCaseRequest, useCaseResponse,
                        storageFactory, presenter);
                }
            ).catch(
                (err) => {
                    console.log(err);
                    this.handleFirebaseGetShopsFailure(useCaseResponse, presenter);
                }
            )
    }

    private async handleFirebaseGetShopsSuccess(result: GetShopsFirebaseResponse,
        apiFactory: ApiFactoryInterface,
        useCaseRequest: GetLocalShopsProductsUseCaseRequest, response: GetLocalShopsProductsUseCaseResponse[],
        storageFactory: StorageFactoryInterface, presenter: GetLocalShopsProductsPresenterInterface) {

        const shops: ShopEntity[] = [];
        const userShopsProducts: ShopProductEntity[] = [];
        //For each dhop document id, we fecth the object
        if (result.getShops() != null) {
            const shops = result.getShops();
            console.log("\n\nGet shops from firebase ");
            //[START] Place controller on distance or area here
            //[END] Place controller on distance or area here
            if (shops != null) {               
                for (const shop of shops) {
                    try {
                        const res = await apiFactory.getFirebase().getFirebaseApiServiceFactory()
                            .getShopService()
                            .getProducts(new GetShopProductsFirebaseRequest(shop));

                        const products = res.getProducts();
                        if(products != null){
                            userShopsProducts.push(...products);
                        }
                    } catch (error) {
                        response[0] = new GetLocalShopsProductsUseCaseResponse(
                            null,
                            null,
                            new Error("An error occured")
                        );
                        presenter.present(response[0]);
                        break;
                    }
                }

                response[0] = new GetLocalShopsProductsUseCaseResponse(
                    shops,
                    userShopsProducts,
                    null
                );
                presenter.present(response[0]);
            }
        } else {
            response[0] = new GetLocalShopsProductsUseCaseResponse(
                null,
                null,
                new Error("An error occured")
            );
            presenter.present(response[0]);
        }





    }

    private handleFirebaseGetShopsFailure(response: GetLocalShopsProductsUseCaseResponse[],
        presenter: GetLocalShopsProductsPresenterInterface) {

        response[0] = new GetLocalShopsProductsUseCaseResponse(
            null, null,
            new Error("An error occured")
        );
        presenter.present(response[0]);
    }
}

export default GetLocalShopsProductsUseCase;