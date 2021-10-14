import ShopProductEntity from "../../../../../entity/product.entity";

export default class GetShopProductsFirebaseResponse {
    private error: Error | null;
    private products: null | ShopProductEntity[];

    constructor(products: null | ShopProductEntity[], error: Error|null){
        this.products = products;
        this.error = error;
    }

    public getError(){return this.error;}
    public getProducts(){return this.products;}
}