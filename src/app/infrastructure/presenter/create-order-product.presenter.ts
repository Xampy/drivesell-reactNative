import CreateOrderProductUseCaseResponse from "../../domain/dto/response/create-order-product-useCase.response";
import ProductOrderEntity from "../../domain/entity/product-order.entity";
import CreateOrderShopProductPresenterInterface from "../../domain/presenter/create-order-product-presenter.interface";

export interface CreateOrderShopProductViewModel {
    setValue: (shop: ProductOrderEntity|null) => void
}


export default class CreateOrderShopProductPresenter implements CreateOrderShopProductPresenterInterface{
    
    private viewModel: CreateOrderShopProductViewModel;

    constructor(viewModel: CreateOrderShopProductViewModel){
        this.viewModel = viewModel;
    }
    public present(response: CreateOrderProductUseCaseResponse){
        if(response.getError() == null){
            if(this.viewModel != null)
                this.viewModel.setValue(response.getOrder());
        }else {
            console.log("[Update Shop Presenter] There was an error", response.getError());
        }
    }
}