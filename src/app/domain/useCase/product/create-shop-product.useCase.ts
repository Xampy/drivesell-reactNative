import CreateShopProductFirebaseRequest from "../../dto/request/api/firebase/product/create-shop-product-firebase.request";
import CreateShopProductUseCaseRequest from "../../dto/request/create-shop-product-useCase.request";
import CreateShopProductFirebaseResponse from "../../dto/response/api/firebase/product/create-shop-product-firebase.response";
import CreateShopProductUseCaseResponse from "../../dto/response/create-shop-product-useCase.response";
import { ApiFactoryInterface } from "../../port/primary/api/api-factory.interface";
import StorageFactoryInterface from "../../port/secondary/storage/storage-factory.interface";
import { STORAGE_SHOPS_PRODUCTS_KEY } from "../../port/secondary/storage/storage.interface";
import NewUserShopProductCreatePresenterInterface from "../../presenter/new-user-shop-product-create-presenter.interface";

class CreateShopProductUseCase {

    constructor() { }

    public execute(useCaseRequest: CreateShopProductUseCaseRequest,
        storageFactory: StorageFactoryInterface,
        apiFactory: ApiFactoryInterface, presenter: NewUserShopProductCreatePresenterInterface) {

        const response: CreateShopProductUseCaseResponse[] = [];

        const request = new CreateShopProductFirebaseRequest(
            useCaseRequest.getProduct(),
            useCaseRequest.getShop()
        )
        console.log("In create shop product use case", request);

        apiFactory.getFirebase().getFirebaseApiServiceFactory()
            .getShopProductService()
            .create(request)
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

    private handleFirebaseCreateSuccess(result: CreateShopProductFirebaseResponse,
        useCaseRequest: CreateShopProductUseCaseRequest, response: CreateShopProductUseCaseResponse[],
        storageFactory: StorageFactoryInterface, presenter: NewUserShopProductCreatePresenterInterface) {

        response[0] = new CreateShopProductUseCaseResponse(
            result.getShopProduct(),
            null
        );

        //Store the data to local storage
        if (result.getShopProduct() != null) {
            const shopsProducts = storageFactory.getLocalStorage().storage.shopsProducts;
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

    private handleFirebaseCreateFailure(response: CreateShopProductUseCaseResponse[],
        presenter: NewUserShopProductCreatePresenterInterface) {

        response[0] = new CreateShopProductUseCaseResponse(
            null,
            new Error("An error occured")
        );
        presenter.present(response[0]);
    }
}

export default CreateShopProductUseCase;