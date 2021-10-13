import UpdateShopProductUseCaseResponse from "../dto/response/update-shop-product-useCase.response";

export default interface UpdateShopProductPresenterInterface {
    present: (response: UpdateShopProductUseCaseResponse) => void
}