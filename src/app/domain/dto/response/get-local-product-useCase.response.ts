import ShopProductEntity from "../../entity/product.entity";
import ShopEntity from "../../entity/shop.entity";



export default class GetLocalShopsProductsUseCaseResponse {
    private error: Error | null;
    private shops: null | ShopEntity[];
    private products: null | ShopProductEntity[];

    constructor(shops: ShopEntity[]|null,products: null | ShopProductEntity[], error: Error|null){
        this.shops = shops;
        this.products = products;
        this.error = error;
    }

    public getError(){return this.error;}
    public getShops(){return this.shops;}
    public getProducts(){return this.products;}
}