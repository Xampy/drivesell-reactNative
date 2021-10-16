import GetLocalShopsProductsUseCaseResponse from "../dto/response/get-local-product-useCase.response";

export default interface GetLocalShopsProductsPresenterInterface {
    present: (response: GetLocalShopsProductsUseCaseResponse) => void
}