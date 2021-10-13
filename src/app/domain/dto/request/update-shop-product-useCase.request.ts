import ShopProductEntity, { ShopProductEntityInterface } from "../../entity/product.entity";
import ShopEntity, { ShopEntityInterface } from "../../entity/shop.entity";

export default class UpdateShopProductUseCaseRequest {
    
    private product: ShopProductEntity;
    private shop: ShopEntity;
    private lastShopId: string | null;

    constructor(product: ShopProductEntity, shop: ShopEntity, lastShopId: string | null){
        this.product = product;
        this.shop = shop;
        this.lastShopId = lastShopId;
    }

    public getProduct(){return this.product;}
    public getShop(){return this.shop;}
    public getLastShopId(){return this.lastShopId;}
}