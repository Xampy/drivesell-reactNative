import ShopProductEntity from "../../entity/product.entity";

export default class UpdateShopProductUseCaseResponse {
    private error: Error | null;
    private shopProduct: null | ShopProductEntity;

    constructor(shopProduct: ShopProductEntity|null, error: Error|null){
        this.shopProduct = shopProduct
        this.error = error;
    }

    public getError(){return this.error;}
    public getShopProduct(){return this.shopProduct;}
}