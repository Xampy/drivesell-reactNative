import DeleteShopProductUseCaseResponse from "../../domain/dto/response/delete-shop-product-useCase.response";
import DeleteShopProductPresenterInterface from "../../domain/presenter/delete-shop-product-presenter.interface";

export interface DeleteShopProductViewModel {
    setErrorValue: (error: Error|null) => void
}


export default class DeleteShopProductPresenter implements DeleteShopProductPresenterInterface{
    
    private viewModel: DeleteShopProductViewModel;

    constructor(viewModel: DeleteShopProductViewModel){
        this.viewModel = viewModel;
    }
    public present(response: DeleteShopProductUseCaseResponse){
        console.log("[In delete use case presenter ] " + response.getError());
        if(response.getError() == null){
            if(this.viewModel != null)
                this.viewModel.setErrorValue(response.getError());
        }else {
            console.log("[Delete Shop Product Presenter] Error occured", response.getError());
        }
    }
}