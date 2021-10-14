import GetUserShopsUseCaseResponse from "../dto/response/get-user-shops-useCase.response";

export default interface GetUserShopsPresenterInterface {
    present: (response: GetUserShopsUseCaseResponse) => void
}