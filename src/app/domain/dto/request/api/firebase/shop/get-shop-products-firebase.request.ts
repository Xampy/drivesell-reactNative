import ShopEntity from "../../../../../entity/shop.entity";

export default class GetShopProductsFirebaseRequest {
    private shop: ShopEntity;
    constructor(shop: ShopEntity) {
        this.shop = shop;
    }

    public getShop(){
         return this.shop; 
    }
}