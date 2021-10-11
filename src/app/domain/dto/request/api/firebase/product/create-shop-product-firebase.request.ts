import ShopProductEntity, { ShopProductEntityInterface } from "../../../../../entity/product.entity";
import ShopEntity, { ShopEntityInterface } from "../../../../../entity/shop.entity";

export interface CreateShopProductFirebaseRequestProductInterface
    extends ShopProductEntityInterface {

}

export default class CreateShopProductFirebaseRequest {
    private product: ShopProductEntity;
    private shop: ShopEntity;

    constructor(product: ShopProductEntity,
        shop: ShopEntity) {

        this.shop = shop;
        this.product = product;
    }

    public getProduct = () => this.product;
    public getShop = () => this.shop;
}