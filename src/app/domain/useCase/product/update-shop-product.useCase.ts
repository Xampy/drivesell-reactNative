import CreateShopProductFirebaseRequest from "../../dto/request/api/firebase/product/create-shop-product-firebase.request";
import UpdateShopProductFirebaseRequest from "../../dto/request/api/firebase/product/update-shop-product-firebase.request";
import CreateShopProductUseCaseRequest from "../../dto/request/create-shop-product-useCase.request";
import UpdateShopProductUseCaseRequest from "../../dto/request/update-shop-product-useCase.request";
import CreateShopProductFirebaseResponse from "../../dto/response/api/firebase/product/create-shop-product-firebase.response";
import UpdateShopProductFirebaseResponse from "../../dto/response/api/firebase/product/update-shop-product-firebase.response";
import CreateShopProductUseCaseResponse from "../../dto/response/create-shop-product-useCase.response";
import UpdateShopProductUseCaseResponse from "../../dto/response/update-shop-product-useCase.response";
import { ApiFactoryInterface } from "../../port/primary/api/api-factory.interface";
import StorageFactoryInterface from "../../port/secondary/storage/storage-factory.interface";
import { STORAGE_SHOPS_PRODUCTS_KEY } from "../../port/secondary/storage/storage.interface";
import NewUserShopProductCreatePresenterInterface from "../../presenter/new-user-shop-product-create-presenter.interface";
import UpdateShopProductPresenterInterface from "../../presenter/update-shop-product-presenter.interface";

class UpdateShopProductUseCase {

    constructor() { }

    public execute(useCaseRequest: UpdateShopProductUseCaseRequest,
        storageFactory: StorageFactoryInterface,
        apiFactory: ApiFactoryInterface, presenter: UpdateShopProductPresenterInterface) {

        const response: UpdateShopProductUseCaseResponse[] = [];

        const request = new UpdateShopProductFirebaseRequest(
            useCaseRequest.getProduct(),
            useCaseRequest.getShop(),
            useCaseRequest.getLastShopId()
        )
        console.log("\n\nIn update shop product use case", request);

        apiFactory.getFirebase().getFirebaseApiServiceFactory()
            .getShopProductService()
            .update(request)
            .then(
                (result) => {
                    this.handleFirebaseCreateSuccess(result, useCaseRequest, response,
                        storageFactory, presenter);
                }
            ).catch(
                (err) => {
                    console.log(err);
                    this.handleFirebaseCreateFailure(response, presenter);
                }
            )
    }

    private handleFirebaseCreateSuccess(result: UpdateShopProductFirebaseResponse,
        useCaseRequest: UpdateShopProductUseCaseRequest, response: UpdateShopProductUseCaseResponse[],
        storageFactory: StorageFactoryInterface, presenter: UpdateShopProductPresenterInterface) {

        response[0] = new UpdateShopProductUseCaseResponse(
            result.getShopProduct(),
            null
        );

        //Store the data to local storage
        if (result.getShopProduct() != null) {
            let shopsProducts = storageFactory.getLocalStorage().storage.shopsProducts;
            shopsProducts = shopsProducts.filter( (sp) => sp.id != result.getShopProduct()?.getId() );
            
            shopsProducts.push(
                {
                    name: result.getShopProduct()?.getName(),
                    price: result.getShopProduct()?.getPrice(),
                    reduction: result.getShopProduct()?.getReduction(),
                    description: result.getShopProduct()?.getDescription(),

                    details: result.getShopProduct()?.getDetails(),
                    shippings: result.getShopProduct()?.getShippings(),

                    mainImage: result.getShopProduct()?.getMainImage(),
                    subOneImage: result.getShopProduct()?.getSubOneImage(),
                    subTwoImage: result.getShopProduct()?.getSubTwoImage(),
                    subThreeImage: result.getShopProduct()?.getSubThreeImage(),

                    shopId: result.getShopProduct()?.getShopId(),
                    id: result.getShopProduct()?.getId()
                }
            )

            storageFactory.getLocalStorage().storeObject(STORAGE_SHOPS_PRODUCTS_KEY, shopsProducts);
            console.log(storageFactory.getLocalStorage().getObject(STORAGE_SHOPS_PRODUCTS_KEY));
        }

        presenter.present(response[0]);
    }

    private handleFirebaseCreateFailure(response: UpdateShopProductUseCaseResponse[],
        presenter: UpdateShopProductPresenterInterface) {

        response[0] = new UpdateShopProductUseCaseResponse(
            null,
            new Error("An error occured")
        );
        presenter.present(response[0]);
    }
}

export default UpdateShopProductUseCase;