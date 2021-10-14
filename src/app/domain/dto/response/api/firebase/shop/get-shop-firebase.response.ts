import ShopEntity from "../../../../../entity/shop.entity";

export default class GetShopFirebaseResponse {
    private error: Error | null;
    private shop: null | ShopEntity;

    constructor(shop: ShopEntity|null, error: Error|null){
        this.shop = shop
        this.error = error;
    }

    public getError(){return this.error;}
    public getShop(){return this.shop;}

}