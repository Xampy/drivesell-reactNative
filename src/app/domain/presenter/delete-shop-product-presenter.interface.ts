import DeleteShopProductUseCaseResponse from "../dto/response/delete-shop-product-useCase.response";

export default interface DeleteShopProductPresenterInterface {
    present: (response: DeleteShopProductUseCaseResponse) => void
}