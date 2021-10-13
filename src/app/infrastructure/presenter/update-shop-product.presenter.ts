import UpdateShopProductUseCaseResponse from "../../domain/dto/response/update-shop-product-useCase.response";
import ShopProductEntity from "../../domain/entity/product.entity";
import UpdateShopProductPresenterInterface from "../../domain/presenter/update-shop-product-presenter.interface";

export interface UpdateShopProductViewModel {
    setShopProductValue: (shopProduct: ShopProductEntity|null) => void
}


export default class UpdateShopProductPresenter implements UpdateShopProductPresenterInterface{
    
    private viewModel: UpdateShopProductViewModel;

    constructor(viewModel: UpdateShopProductViewModel){
        this.viewModel = viewModel;
    }
    public present(response: UpdateShopProductUseCaseResponse){
        if(response.getError() == null){
            if(this.viewModel != null)
                this.viewModel.setShopProductValue(response.getShopProduct());
        }else {
            console.log("[Create Shop Product Presenter] Error occured", response.getError());
        }
    }
}