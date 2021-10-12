import UpdateShopUseCaseResponse from "../dto/response/update-shop-useCase.response";

export default interface UpdateUserShopPresenterInterface {
    present: (response: UpdateShopUseCaseResponse) => void
}