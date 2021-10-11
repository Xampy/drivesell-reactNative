import CreateShopUseCaseResponse from "../dto/response/create-shop-useCase.response";

export default interface NewUserShopCreatePresenterInterface {
    present: (response: CreateShopUseCaseResponse) => void
}