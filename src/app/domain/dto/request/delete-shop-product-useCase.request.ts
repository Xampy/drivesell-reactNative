import ShopProductEntity from "../../entity/product.entity";
import ShopEntity from "../../entity/shop.entity";

export default class DeleteShopProductUseCaseRequest {
    
    private product: ShopProductEntity;
    private shop: ShopEntity;

    constructor(product: ShopProductEntity, shop: ShopEntity){
        this.product = product;
        this.shop = shop;
    }

    public getProduct(){return this.product;}
    public getShop(){return this.shop;}
}