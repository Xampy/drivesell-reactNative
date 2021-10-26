import OrderProductUseCaseResponse from "../dto/response/create-order-product-useCase.response";

export default interface CreateOrderShopProductPresenterInterface {
    present: (response: OrderProductUseCaseResponse) => void
}