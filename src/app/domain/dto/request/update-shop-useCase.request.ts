import ShopEntity from "../../entity/shop.entity";

export default class UpdateShopUseCaseRequest {
    private shop: ShopEntity;

    private locationChanged: boolean;

    constructor(shop: ShopEntity, locationChanged: boolean) {

        this.shop = shop;
        this.locationChanged = locationChanged;
    }

    public getShop(){
         return this.shop; 
    }

    public getLocationChanged(){
        return this.locationChanged; 
   }
}