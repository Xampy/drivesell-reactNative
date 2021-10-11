import CreateShopProductUseCaseResponse from "../../domain/dto/response/create-shop-product-useCase.response";
import ShopProductEntity from "../../domain/entity/product.entity";
import NewUserShopProductCreatePresenterInterface from "../../domain/presenter/new-user-shop-product-create-presenter.interface";

export interface NewShopProductViewModel {
    setShopProductValue: (shopProduct: ShopProductEntity|null) => void
}


export default class NewUserShopProductCreatePresenter implements NewUserShopProductCreatePresenterInterface{
    
    private viewModel: NewShopProductViewModel;

    constructor(viewModel: NewShopProductViewModel){
        this.viewModel = viewModel;
    }
    public present(response: CreateShopProductUseCaseResponse){
        if(response.getError() == null){
            if(this.viewModel != null)
                this.viewModel.setShopProductValue(response.getShopProduct());
        }else {
            console.log("There was an error", response.getError());
        }
    }
}