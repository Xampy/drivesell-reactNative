import GetLocalShopsProductsUseCaseResponse from "../../domain/dto/response/get-local-product-useCase.response";
import ShopProductEntity from "../../domain/entity/product.entity";
import ShopEntity from "../../domain/entity/shop.entity";
import GetLocalShopsProductsPresenterInterface from "../../domain/presenter/get-local-shops-products-presenter.interface";

export interface GetLocalShopsProductsViewModel {
    setDataValue: (shops: ShopEntity[]|null, products: ShopProductEntity[]|null) => void
}


export default class GetLocalShopsProductsPresenter implements GetLocalShopsProductsPresenterInterface{
    
    private viewModel: GetLocalShopsProductsViewModel;

    constructor(viewModel: GetLocalShopsProductsViewModel){
        this.viewModel = viewModel;
    }
    public present(response: GetLocalShopsProductsUseCaseResponse){
        if(response.getError() == null){
            if(this.viewModel != null)
                this.viewModel.setDataValue(response.getShops(), response.getProducts());
        }else {
            console.log("[Get User Shops Presenter] There was an error", response.getError());
        }
    }
}