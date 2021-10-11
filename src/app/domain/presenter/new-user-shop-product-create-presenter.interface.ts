import CreateShopProductUseCaseResponse from "../dto/response/create-shop-product-useCase.response";

export default interface NewUserShopProductCreatePresenterInterface {
    present: (response: CreateShopProductUseCaseResponse) => void
}