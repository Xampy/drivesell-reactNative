import ShopProductEntity from "../../entity/product.entity";

export default class CreateShopProductUseCaseResponse {
    private error: Error | null;
    private shopProduct: null | ShopProductEntity;

    constructor(shopProduct: ShopProductEntity|null, error: Error|null){
        this.shopProduct = shopProduct
        this.error = error;
    }

    public getError = () => this.error;
    public getShopProduct = () => this.shopProduct;
}