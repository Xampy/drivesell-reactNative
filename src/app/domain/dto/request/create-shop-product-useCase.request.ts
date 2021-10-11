import ShopProductEntity, { ShopProductEntityInterface } from "../../entity/product.entity";
import ShopEntity, { ShopEntityInterface } from "../../entity/shop.entity";

export default class CreateShopProductUseCaseRequest {
    
    private product: ShopProductEntity;
    private shop: ShopEntity;

    constructor(product: ShopProductEntity, shop: ShopEntity){
        this.product = product;
        this.shop = shop;
    }

    public getProduct = () => this.product;
    public getShop = () => this.shop;
}