import CreateShopProductFirebaseRequest from "../../dto/request/api/firebase/product/create-shop-product-firebase.request";
import DeleteShopProductFirebaseRequest from "../../dto/request/api/firebase/product/delete-shop-product-firebase.request";
import CreateShopProductUseCaseRequest from "../../dto/request/create-shop-product-useCase.request";
import DeleteShopProductUseCaseRequest from "../../dto/request/delete-shop-product-useCase.request";
import CreateShopProductFirebaseResponse from "../../dto/response/api/firebase/product/create-shop-product-firebase.response";
import DeleteShopProductFirebaseResponse from "../../dto/response/api/firebase/product/delete-shop-product-firebase.response";
import CreateShopProductUseCaseResponse from "../../dto/response/create-shop-product-useCase.response";
import DeleteShopProductUseCaseResponse from "../../dto/response/delete-shop-product-useCase.response";
import { ApiFactoryInterface } from "../../port/primary/api/api-factory.interface";
import StorageFactoryInterface from "../../port/secondary/storage/storage-factory.interface";
import { STORAGE_SHOPS_PRODUCTS_KEY } from "../../port/secondary/storage/storage.interface";
import DeleteShopProductPresenterInterface from "../../presenter/delete-shop-product-presenter.interface";
import NewUserShopProductCreatePresenterInterface from "../../presenter/new-user-shop-product-create-presenter.interface";

class DeleteShopProductUseCase {

    constructor() { }

    public execute(useCaseRequest: DeleteShopProductUseCaseRequest,
        storageFactory: StorageFactoryInterface,
        apiFactory: ApiFactoryInterface, presenter: DeleteShopProductPresenterInterface) {

        const response: DeleteShopProductUseCaseResponse[] = [];

        const request = new DeleteShopProductFirebaseRequest(
            useCaseRequest.getProduct(),
            useCaseRequest.getShop()
        )
        console.log("\n\nIn delete shop product use case");
        console.log(request);

        apiFactory.getFirebase().getFirebaseApiServiceFactory()
            .getShopProductService()
            .delete(request)
            .then(
                (result) => {
                    this.handleFirebaseDeleteSuccess(result, useCaseRequest, response,
                        storageFactory, presenter);
                }
            ).catch(
                (err) => {
                    console.log(err);
                    this.handleFirebaseDeleteFailure(response, presenter);
                }
            )
    }

    private handleFirebaseDeleteSuccess(result: DeleteShopProductFirebaseResponse,
        useCaseRequest: DeleteShopProductUseCaseRequest, response: DeleteShopProductUseCaseResponse[],
        storageFactory: StorageFactoryInterface, presenter: DeleteShopProductPresenterInterface) {

        response[0] = new DeleteShopProductUseCaseResponse(
            null
        );

        //Store the data to local storage
        if (result.getError() == null) {
            let shopsProducts = storageFactory.getLocalStorage().storage.shopsProducts;
            shopsProducts.filter( (sp) => { sp.id != useCaseRequest.getProduct().getId();})

            storageFactory.getLocalStorage().storeObject(STORAGE_SHOPS_PRODUCTS_KEY, shopsProducts);
            console.log(storageFactory.getLocalStorage().getObject(STORAGE_SHOPS_PRODUCTS_KEY));
        }

        presenter.present(response[0]);
    }

    private handleFirebaseDeleteFailure(response: DeleteShopProductUseCaseResponse[],
        presenter: DeleteShopProductPresenterInterface) {

        response[0] = new DeleteShopProductUseCaseResponse(
            new Error("An error occured")
        );
        presenter.present(response[0]);
    }
}

export default DeleteShopProductUseCase;