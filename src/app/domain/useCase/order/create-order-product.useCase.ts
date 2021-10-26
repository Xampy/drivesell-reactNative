import CreateOrderProductFirebaseRequest from "../../dto/request/api/firebase/order/create-order-product-firebase.request";
import CreateOrderProductUseCaseRequest from "../../dto/request/create-order-product-useCase.request";
import CreateOrderProductFirebaseResponse from "../../dto/response/api/firebase/order/create-order-product-firebase.response";
import CreateOrderProductUseCaseResponse from "../../dto/response/create-order-product-useCase.response";
import { ApiFactoryInterface } from "../../port/primary/api/api-factory.interface";
import StorageFactoryInterface from "../../port/secondary/storage/storage-factory.interface";
import { STORAGE_PRODUCTS_ORDERS_KEY } from "../../port/secondary/storage/storage.interface";
import CreateOrderShopProductPresenterInterface from "../../presenter/create-order-product-presenter.interface";

class CreateOrderShopProductUseCase {

    constructor() { }

    public execute(useCaseRequest: CreateOrderProductUseCaseRequest,
        storageFactory: StorageFactoryInterface,
        apiFactory: ApiFactoryInterface, presenter: CreateOrderShopProductPresenterInterface) {

        const response: CreateOrderProductUseCaseResponse[] = [];


        const request = new CreateOrderProductFirebaseRequest(
            useCaseRequest.getShop(),
            useCaseRequest.getProduct(),
            useCaseRequest.getUserId(),
            {
                latitude: useCaseRequest.getCoords().latitude, 
                longitude: useCaseRequest.getCoords().longitude
            }
        );
        console.log("In create on a shop product use case", request);

        apiFactory.getFirebase().getFirebaseApiServiceFactory()
            .getProductOrderService()
            .create(request)
            .then(
                (result) => {
                    this.handleFirebaseOrderCreateSuccess(result, useCaseRequest, response,
                        storageFactory, presenter);
                }
            ).catch(
                (err) => {
                    console.log(err);
                    this.handleFirebaseOrderCreateFailure(response, presenter);
                }
            )
    }

    private handleFirebaseOrderCreateSuccess(result: CreateOrderProductFirebaseResponse,
        useCaseRequest: CreateOrderProductUseCaseRequest, response: CreateOrderProductUseCaseResponse[],
        storageFactory: StorageFactoryInterface, presenter: CreateOrderShopProductPresenterInterface) {

        response[0] = new CreateOrderProductUseCaseResponse(
            result.getOrder(),
            null
        );

        //Store the order data to local storage
        const order = result.getOrder();
        if (order != null) {
            const productsOrders = storageFactory.getLocalStorage().storage.orders;
            productsOrders.push(
                {
                    shopId: order.getShopId(),
                    country: order.getCountry(),
                    provinceOrRegion: order.getProvinceOrRegion(),
                    city: order.getCity(),

                    productId: order.getProductId(),

                    latitude: order.getLatitude(),
                    longitude: order.getLongitude(),

                    userId: order.getUserId(),

                    id: order.getId(),
                    completed: order.isCompleted()
                }
            )

            storageFactory.getLocalStorage().storeObject(STORAGE_PRODUCTS_ORDERS_KEY, productsOrders);
            console.log(storageFactory.getLocalStorage().getObject(STORAGE_PRODUCTS_ORDERS_KEY));
        }

        //[FEATURE] In nexersion store a ref for the user that ordered the product

        presenter.present(response[0]);
    }

    private handleFirebaseOrderCreateFailure(response: CreateOrderProductUseCaseResponse[],
        presenter: CreateOrderShopProductPresenterInterface) {

        response[0] = new CreateOrderProductUseCaseResponse(
            null,
            new Error("An error occured")
        );
        presenter.present(response[0]);
    }
}

export default CreateOrderShopProductUseCase;