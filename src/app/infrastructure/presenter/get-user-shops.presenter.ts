import GetUserShopsUseCaseResponse from "../../domain/dto/response/get-user-shops-useCase.response";
import ShopProductEntity from "../../domain/entity/product.entity";
import ShopEntity from "../../domain/entity/shop.entity";
import GetUserShopsPresenterInterface from "../../domain/presenter/get-user-shops-presenter.interface";

export interface GetUserShopsViewModel {
    setDataValue: (shops: ShopEntity[]|null, products: ShopProductEntity[]|null) => void
}


export default class GetUserShopsPresenter implements GetUserShopsPresenterInterface{
    
    private viewModel: GetUserShopsViewModel;

    constructor(viewModel: GetUserShopsViewModel){
        this.viewModel = viewModel;
    }
    public present(response: GetUserShopsUseCaseResponse){
        if(response.getError() == null){
            if(this.viewModel != null)
                this.viewModel.setDataValue(response.getShops(), response.getProducts());
        }else {
            console.log("[Get User Shops Presenter] There was an error", response.getError());
        }
    }
}