import UpdateShopUseCaseResponse from "../../domain/dto/response/update-shop-useCase.response";
import ShopEntity from "../../domain/entity/shop.entity";
import UpdateUserShopPresenterInterface from "../../domain/presenter/update-user-shop-presenter.interface";

export interface UpdateShopViewModel {
    setShopValue: (shop: ShopEntity|null) => void
}


export default class UpdateUserShopPresenter implements UpdateUserShopPresenterInterface{
    
    private viewModel: UpdateShopViewModel;

    constructor(viewModel: UpdateShopViewModel){
        this.viewModel = viewModel;
    }
    public present(response: UpdateShopUseCaseResponse){
        if(response.getError() == null){
            if(this.viewModel != null)
                this.viewModel.setShopValue(response.getShop());
        }else {
            console.log("[Update Shop Presenter] There was an error", response.getError());
        }
    }
}