import ShopProductEntity from "../../../../../entity/product.entity";
import ShopEntity from "../../../../../entity/shop.entity";

export default class DeleteShopProductFirebaseRequest {
    private product: ShopProductEntity;
    private shop: ShopEntity;

    constructor(product: ShopProductEntity, shop: ShopEntity) {

        this.shop = shop;
        this.product = product;
    }

    public getProduct(){return this.product;}
    public getShop(){return this.shop;}
}