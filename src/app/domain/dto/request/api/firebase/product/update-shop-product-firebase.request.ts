import ShopProductEntity, { ShopProductEntityInterface } from "../../../../../entity/product.entity";
import ShopEntity, { ShopEntityInterface } from "../../../../../entity/shop.entity";

export interface UpdateShopProductFirebaseRequestProductInterface
    extends ShopProductEntityInterface {

}

export default class UpdateShopProductFirebaseRequest {
    private product: ShopProductEntity;
    private shop: ShopEntity;
    private lastShopId: string | null;

    constructor(product: ShopProductEntity,
        shop: ShopEntity, lastShopId: string | null) {

        this.shop = shop;
        this.product = product;
        this.lastShopId = lastShopId;
    }

    public getProduct(){return this.product;}
    public getShop(){return this.shop;}
    public getLastShopId(){return this.lastShopId;}
}