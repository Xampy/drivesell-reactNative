import CreateShopUseCaseResponse from "../../domain/dto/response/create-shop-useCase.response";
import ShopEntity from "../../domain/entity/shop.entity";
import NewUserShopCreatePresenterInterface from "../../domain/presenter/new-user-shop-create-presenter.interface";

export interface NewShopViewModel {
    setShopValue: (shop: ShopEntity|null) => void
}


export default class NewUserShopCreatePresenter implements NewUserShopCreatePresenterInterface{
    
    private viewModel: NewShopViewModel;

    constructor(viewModel: NewShopViewModel){
        this.viewModel = viewModel;
    }
    public present(response: CreateShopUseCaseResponse){
        if(response.getError() == null){
            if(this.viewModel != null)
                this.viewModel.setShopValue(response.getShop());
        }else {
            console.log("[Create Shop Presenter] There was an error", response.getError());
        }
    }
}